const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const {OrthographicCamera, Vector3, Euler} = require('three');
const source = ts.createSourceFile('journey-scene.tsx', fs.readFileSync('components/portfolio/journey-scene.tsx','utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
let resize;
function visit(node) {
 if(ts.isJsxOpeningElement(node) && node.tagName.getText(source)==='Canvas') {
  const attribute=node.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.text==='resize');
  assert.ok(attribute?.initializer && ts.isJsxExpression(attribute.initializer));
  resize=vm.runInNewContext('('+attribute.initializer.expression.getText(source)+')');
 }
 ts.forEachChild(node,visit);
}
visit(source);
const measureSource=fs.readFileSync(require.resolve('react-use-measure',{paths:[require.resolve('@react-three/fiber')]}),'utf8');
function measure(scale,options) {
 let measured;const cleanups=[];
 const react={useState:initial=>[initial,value=>{measured=value}],useRef:value=>({current:value}),useMemo:fn=>fn(),useEffect:fn=>{const cleanup=fn();if(cleanup)cleanups.push(cleanup)}};
 const window={ResizeObserver:class{observe(){} disconnect(){}},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({overflow:'visible',overflowX:'visible',overflowY:'visible'})};
 const document={body:{}};
 class Element {
  offsetWidth=1800;offsetHeight=900;parentElement=document.body;
  getBoundingClientRect(){return {x:130,y:25,left:130,top:25,right:130+1800*scale,bottom:25+900*scale,width:1800*scale,height:900*scale}}
 }
 const module={exports:{}};
 vm.runInNewContext(measureSource,{require:name=>{assert.equal(name,'react');return react},module,window,document,screen:{},HTMLElement:Element});
 const [ref,,refresh]=module.exports(options);ref(new Element());refresh();cleanups.forEach(fn=>fn());
 return measured;
}
const stops=[[150,600],[375,450],[640,350],[1015,475],[1250,300],[1500,430],[1510,600],[1730,520]];
let maxError=0;const cases=[];
for(const scale of [.2,.35,.55,.85,1,1.25]) {
 const bounds=measure(scale,resize);
 assert.equal(bounds.width,1800);assert.equal(bounds.height,900);
 const camera=new OrthographicCamera(-bounds.width/2,bounds.width/2,bounds.height/2,-bounds.height/2,.1,3000);
 camera.position.set(0,0,1600);camera.zoom=Math.min(bounds.width/1800,bounds.height/900);camera.updateProjectionMatrix();camera.updateMatrixWorld();
 for(const tiltX of [12,16,20])for(const tiltY of [-6.5,-2,2.5])for(const [x,y] of stops) {
  const point=new Vector3(x-900,450-y,0).applyEuler(new Euler(-tiltX*Math.PI/180,tiltY*Math.PI/180,0));
  const projected=point.clone().project(camera);
  const actualX=(projected.x+1)/2*bounds.width*scale;
  const actualY=(1-projected.y)/2*bounds.height*scale;
  const error=Math.hypot(actualX-(point.x+900)*scale,actualY-(450-point.y)*scale);
  maxError=Math.max(maxError,error);assert.ok(error<.001,'Canvas and route projection remain aligned');
 }
 cases.push({scale,layoutWidth:bounds.width,screenWidth:bounds.width*scale});
}
const old=measure(.55,{offsetSize:false,scroll:false});
assert.ok(Math.abs(old.width-990)<.001,'Reproduces the old transformed measurement');
assert.ok(Math.abs(old.width*.55-1800*.55)>400,'Old canvas scales twice');
console.log(JSON.stringify({passed:true,projectionChecks:432,maximumPixelError:maxError,cases,oldCanvasScreenWidth:old.width*.55,correctedScreenWidth:1800*.55},null,2));
