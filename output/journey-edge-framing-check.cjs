const fs = require('node:fs');
const ts = require('typescript');
const assert = require('node:assert/strict');
const THREE = require('three');
function load(file) {
 const mod={exports:{}};
 const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 new Function('require','module','exports',compiled)(require,mod,mod.exports);
 return mod.exports;
}
const {journeyFrame}=load('lib/journey-framing.ts');
const {ATLAS_BLEED,makeAtlasRelief,makeSail,sailingRoute}=load('lib/journey-scene-geometry.ts');
const stops=[[150,600],[375,450],[640,350],[1015,475],[1250,300],[1500,430],[1510,600],[1730,520]];
const panels=[[1203,494],[1200,500],[900,440],[600,300],[490,270],[350,170],[350,240],[700,160]];
let checks=0;
for(const [width,height]of panels) {
 const frame=journeyFrame(width,height,true,{x:900,y:450});
 assert.equal(frame.x,0);assert.equal(frame.y,0);
 assert.ok(Math.abs(frame.scaleX*1800-width)<.001);
 assert.ok(Math.abs(frame.scaleY*900-height)<.001);
 for(const tx of [12,16,20])for(const ty of [-6.5,-2,2.5]) {
  const rotation=new THREE.Euler(-tx*Math.PI/180,ty*Math.PI/180,0);
  const matrix=new THREE.Matrix4().makeRotationFromEuler(rotation);
  // Invert the 2D projection of the terrain plane to locate the panel corners.
  const a=matrix.elements[0],b=matrix.elements[4],c=matrix.elements[1],d=matrix.elements[5];
  const determinant=a*d-b*c;
  for(const [x,y] of [[-900,-450],[-900,450],[900,-450],[900,450]]) {
   const px=(d*x-b*y)/determinant,py=(-c*x+a*y)/determinant;
   assert.ok(Math.abs(px)<=900+ATLAS_BLEED && Math.abs(py)<=450+ATLAS_BLEED,'Tilt covers every panel corner');checks++;
  }
  for(const [x,y]of stops) {
   const p=new THREE.Vector3(x-900,450-y,0).applyEuler(rotation);
   const sx=(p.x+900)*frame.scaleX,sy=(450-p.y)*frame.scaleY;
   assert.ok(sx>=10&&sx<=width-10&&sy>=10&&sy<=height-10,'Every pin remains visible');checks++;
  }
 }
 for(const [x,y]of stops) {
  const follow=journeyFrame(width,height,false,{x,y});
  assert.ok(follow.x<=0&&follow.y<=0&&follow.x+1800*follow.scaleX>=width-.001&&follow.y+900*follow.scaleY>=height-.001,'Follow camera covers the panel');checks++;
 }
}
const data=new Uint8ClampedArray(360*180*4).fill(200);
global.document={createElement:()=>({getContext:()=>({drawImage(){},getImageData:()=>({data})})})};
const geometry=makeAtlasRelief({});
const positions=geometry.getAttribute('position'),uv=geometry.getAttribute('uv');
for(let i=0;i<positions.count;i++) {
 assert.ok(Math.abs(uv.getX(i)-(positions.getX(i)+900)/1800)<1e-6);
 assert.ok(Math.abs(uv.getY(i)-(positions.getY(i)+450)/900)<1e-6);
}
let minimumSailHeight=Infinity;
const sail=makeSail(true);
for(let i=0;i<100;i++) {
 const tangent=sailingRoute.getTangentAt(i/100);
 const model=new THREE.Matrix4().makeRotationZ(Math.atan2(tangent.y,tangent.x)).multiply(new THREE.Matrix4().makeRotationX(.74));
 const atlas=new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(-16*Math.PI/180,-2*Math.PI/180,0));
 const transform=atlas.multiply(model);
 const screenPoints=[];
 for(let v=0;v<sail.getAttribute('position').count;v++) screenPoints.push(new THREE.Vector3().fromBufferAttribute(sail.getAttribute('position'),v).applyMatrix4(transform));
 const width=Math.max(...screenPoints.map(p=>p.x))-Math.min(...screenPoints.map(p=>p.x));
 const height=Math.max(...screenPoints.map(p=>p.y))-Math.min(...screenPoints.map(p=>p.y));
 minimumSailHeight=Math.min(minimumSailHeight,Math.max(width,height));
}
assert.ok(minimumSailHeight>30,'Sails remain readable through the full sailing loop');
console.log(JSON.stringify({passed:true,framingChecks:checks,terrainVertices:positions.count,minimumSailExtent:minimumSailHeight,panels},null,2));
geometry.dispose();sail.dispose();
