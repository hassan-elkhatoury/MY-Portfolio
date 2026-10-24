import { CanvasTexture, NoColorSpace, RepeatWrapping, SRGBColorSpace } from "three"

function canvas(width: number, height: number) {
  const element = document.createElement("canvas")
  element.width = width
  element.height = height
  const context = element.getContext("2d")
  if (!context) throw new Error("Toolkit textures are unavailable")
  return { element, context }
}

function texture(element: HTMLCanvasElement) {
  const result = new CanvasTexture(element)
  result.colorSpace = SRGBColorSpace
  result.anisotropy = 4
  return result
}

function random(seed: number) {
  let value = seed
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296 }
}

/** Local, deterministic paper fibres. No image download or scene-sized bitmap. */
export function makeToolkitKraft() {
  const { element, context } = canvas(512, 512)
  const noise = random(2901)
  context.fillStyle = "#c69560"
  context.fillRect(0, 0, 512, 512)
  const pixels = context.getImageData(0, 0, 512, 512)
  for (let i = 0; i < pixels.data.length; i += 4) {
    const value = (noise() - .5) * 20
    pixels.data[i] += value
    pixels.data[i + 1] += value
    pixels.data[i + 2] += value
  }
  context.putImageData(pixels, 0, 0)
  for (let i = 0; i < 4500; i++) {
    const x = noise() * 512, y = noise() * 512
    context.strokeStyle = i % 2 ? "#fff2d620" : "#79533218"
    context.lineWidth = .45
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + noise() * 2, y + 2 + noise() * 5)
    context.stroke()
  }
  const paper = texture(element)
  paper.wrapS = paper.wrapT = RepeatWrapping
  paper.repeat.set(.6, .6)
  const bump = paper.clone()
  bump.colorSpace = NoColorSpace
  bump.needsUpdate = true
  return { paper, bump }
}

export function makeToolkitFrontPrint() {
  const { element, context: ctx } = canvas(1536, 896)
  ctx.fillStyle = "#3e3023"
  ctx.font = "700 144px Arial, sans-serif"
  ctx.fillText("MY", 120, 310)
  ctx.fillText("SKILLS", 120, 460)
  ctx.font = "27px monospace"
  ctx.fillText("TOOLS · TECHNOLOGIES", 126, 553)
  ctx.fillText("THINGS I USE", 126, 594)
  ctx.save()
  ctx.translate(1120, 558); ctx.rotate(-.035)
  ctx.fillStyle = "#f0d6b1"
  ctx.beginPath(); ctx.roundRect(-158, -137, 316, 268, 28); ctx.fill()
  ctx.fillStyle = "#47382c"
  ctx.font = "700 29px Arial, sans-serif"
  ctx.fillText("HANDLE", -107, -41)
  ctx.fillText("WITH", -107, -3)
  ctx.fillText("CURIOSITY", -107, 35)
  ctx.strokeStyle = "#a76230"; ctx.lineWidth = 6
  ctx.beginPath(); ctx.moveTo(70, -70); ctx.lineTo(106, -105); ctx.lineTo(77, -102)
  ctx.moveTo(106, -105); ctx.lineTo(103, -75)
  ctx.moveTo(70, 94); ctx.lineTo(106, 59); ctx.lineTo(77, 62)
  ctx.moveTo(106, 59); ctx.lineTo(103, 89); ctx.stroke()
  ctx.restore()
  return texture(element)
}

export function makeToolkitSidePrint() {
  const { element, context: ctx } = canvas(768, 768)
  ctx.strokeStyle = "#624629"
  ctx.fillStyle = "#624629"
  ctx.lineWidth = 4
  ctx.beginPath(); ctx.arc(355, 244, 108, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.ellipse(355, 244, 46, 108, 0, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(247, 244); ctx.lineTo(463, 244)
  ctx.moveTo(355, 136); ctx.lineTo(355, 352); ctx.stroke()
  for (const y of [194, 294]) {
    ctx.beginPath(); ctx.ellipse(355, y, 95, 20, 0, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.font = "22px monospace"
  ctx.fillText("BUILD. LEARN. REPEAT.", 170, 414)
  const noise = random(1207)
  let x = 160
  while (x < 547) {
    const width = 2 + Math.floor(noise() * 5)
    ctx.fillRect(x, 500, width, 90)
    x += width + 3 + Math.floor(noise() * 4)
  }
  ctx.font = "21px monospace"; ctx.fillText("HEK / TOOLKIT / 01", 177, 625)
  return texture(element)
}

export function makeToolkitTape() {
  const { element, context: ctx } = canvas(256, 1024)
  ctx.fillStyle = "#ddbb89"; ctx.fillRect(0, 0, 256, 1024)
  ctx.strokeStyle = "#b48b561e"; ctx.lineWidth = 2
  for (let x = 4; x < 256; x += 7) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke() }
  ctx.strokeStyle = "#f3d7aa65"; ctx.setLineDash([6, 10]); ctx.lineWidth = 3
  for (const x of [10, 246]) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke() }
  ctx.translate(135, 775); ctx.rotate(-Math.PI / 2)
  ctx.fillStyle = "#775537"; ctx.font = "700 26px monospace"
  ctx.fillText("OPEN WITH CURIOSITY", 0, 0)
  return texture(element)
}

export function makeToolkitGroundShadow() {
  const { element, context } = canvas(256, 256)
  const falloff = context.createRadialGradient(128, 128, 30, 128, 128, 125)
  falloff.addColorStop(0, "#5037209c")
  falloff.addColorStop(.4, "#50372062")
  falloff.addColorStop(1, "#50372000")
  context.fillStyle = falloff
  context.fillRect(0, 0, 256, 256)
  return texture(element)
}
