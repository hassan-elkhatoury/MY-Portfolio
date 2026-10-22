import { CanvasTexture, NoColorSpace, RepeatWrapping, SRGBColorSpace } from "three"

export const archivePalette = ["#d85e31", "#237b9c", "#cb3e53", "#7560bb", "#c3a174", "#668060", "#408c8b", "#87425e"]
const titles = [["Interview", "AI"], ["Qt", "Messenger"], ["Mongo", "ShardLab"], ["CAN 2025", "Predictions"], ["MODEYA"], ["E-Commerce"], ["E-service"], ["Arabela"]]
const descriptions = [["Personalized", "interview coaching."], ["A real-time", "chat experience."], ["Distributed data.", "Built to stay up."], ["The beautiful game,", "in data."], ["A storefront,", "thoughtfully built."], ["From browsing", "to buying."], ["Teaching assignments,", "made simpler."], ["Modest fashion,", "across languages."]]
const tech = ["Java / JavaFX", "C++ / Qt", "MongoDB", "Python", "Next.js", "PHP / Laravel", "PHP / MySQL", "Next.js / React"]

function canvas(width: number, height: number) {
  const element = document.createElement("canvas")
  element.width = width; element.height = height
  const context = element.getContext("2d")
  if (!context) throw new Error("Canvas textures are unavailable")
  return { element, context }
}

function texture(element: HTMLCanvasElement) {
  const result = new CanvasTexture(element)
  result.colorSpace = SRGBColorSpace
  result.anisotropy = 8
  return result
}

function random(seed: number) {
  let value = seed
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296 }
}

function grain(context: CanvasRenderingContext2D, width: number, height: number, opacity = 0.035) {
  const pixels = context.getImageData(0, 0, width, height)
  const noise = random(4217)
  for (let i = 0; i < pixels.data.length; i += 4) {
    const value = (noise() - 0.5) * 255 * opacity
    pixels.data[i] += value; pixels.data[i + 1] += value; pixels.data[i + 2] += value
  }
  context.putImageData(pixels, 0, 0)
}

export function makeArchiveGrain() {
  const { element, context } = canvas(256, 256)
  context.fillStyle = "#bfbfbf"; context.fillRect(0, 0, 256, 256)
  grain(context, 256, 256, 0.5)
  const result = texture(element)
  result.colorSpace = NoColorSpace
  result.wrapS = result.wrapT = RepeatWrapping
  result.repeat.set(1.4, 1.4)
  return result
}

export function makeArchivePaper() {
  const { element, context } = canvas(512, 512)
  context.fillStyle = "#f1e5d3"
  context.fillRect(0, 0, 512, 512)
  grain(context, 512, 512, .12)
  const noise = random(1789)
  for (let i = 0; i < 6000; i++) {
    const x = noise() * 512, y = noise() * 512
    context.strokeStyle = i % 2 ? "#fff9eb24" : "#9a806018"
    context.lineWidth = .4
    context.beginPath(); context.moveTo(x, y)
    context.lineTo(x + noise() * 3 - 1.5, y + noise() * 6)
    context.stroke()
  }
  const result = texture(element)
  result.wrapS = result.wrapT = RepeatWrapping
  result.repeat.set(.7, .7)
  return result
}

function spaced(context: CanvasRenderingContext2D, value: string, x: number, y: number, gap: number) {
  for (const character of value) {
    context.fillText(character, x, y)
    x += context.measureText(character).width + gap
  }
}

export function makeArchiveLabel() {
  const { element, context } = canvas(2048, 256)
  context.clearRect(0, 0, 2048, 256)
  context.fillStyle = "#613711"
  context.font = "65px Georgia, serif"
  spaced(context, "THINGS I BUILT", 108, 120, 13)
  context.font = "19px Arial, sans-serif"
  spaced(context, "PROJECT ARCHIVE", 115, 190, 11)
  context.fillRect(638, 184, 130, 1)
  context.font = "16px Arial, sans-serif"
  spaced(context, "HANDLE WITH CURIOSITY", 1450, 152, 5)
  context.strokeStyle = "#795129"; context.lineWidth = 1.6
  context.beginPath(); context.moveTo(1374, 162); context.lineTo(1402, 128); context.stroke()
  return texture(element)
}

function icon(context: CanvasRenderingContext2D, index: number) {
  context.save(); context.translate(58, 165)
  context.fillStyle = "#ffffff13"; context.strokeStyle = "#ffffff55"; context.lineWidth = 1.4
  context.beginPath(); context.roundRect(0, 0, 112, 118, 23); context.fill(); context.stroke()
  context.strokeStyle = "#fff9e9"; context.lineWidth = 2.7; context.lineCap = "round"; context.lineJoin = "round"
  context.beginPath()
  if (index === 0) {
    context.moveTo(42, 42); context.lineTo(27, 59); context.lineTo(42, 76)
    context.moveTo(70, 42); context.lineTo(85, 59); context.lineTo(70, 76)
    context.moveTo(61, 35); context.lineTo(51, 83)
  } else if (index === 1) {
    context.roundRect(26, 36, 62, 45, 7); context.moveTo(36, 81); context.lineTo(36, 94); context.lineTo(50, 81)
    context.stroke(); context.beginPath()
    for (let i = 0; i < 3; i++) { context.moveTo(40 + i * 16, 58); context.arc(39 + i * 16, 58, 1.6, 0, Math.PI * 2) }
  } else if (index === 2) {
    for (let i = 0; i < 3; i++) { context.ellipse(57, 40 + i * 17, 24, 9, 0, 0, Math.PI * 2) }
    context.moveTo(33, 40); context.lineTo(33, 74); context.moveTo(81, 40); context.lineTo(81, 74)
  } else if (index === 3) {
    context.arc(56, 59, 29, 0, Math.PI * 2); context.moveTo(56, 42)
    for (let i = 1; i <= 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; context.lineTo(56 + Math.cos(a) * 17, 59 + Math.sin(a) * 17) }
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; context.moveTo(56 + Math.cos(a) * 17, 59 + Math.sin(a) * 17); context.lineTo(56 + Math.cos(a) * 29, 59 + Math.sin(a) * 29) }
  } else if (index === 6) {
    context.rect(29, 34, 56, 55); context.moveTo(29, 49); context.lineTo(85, 49)
    for (let i = 1; i < 4; i++) { context.moveTo(29 + i * 14, 49); context.lineTo(29 + i * 14, 89); context.moveTo(29, 49 + i * 10); context.lineTo(85, 49 + i * 10) }
    context.moveTo(42, 27); context.lineTo(42, 40); context.moveTo(72, 27); context.lineTo(72, 40)
  } else if (index === 5) {
    context.roundRect(27, 36, 61, 47, 5); context.moveTo(27, 49); context.lineTo(88, 49)
    context.roundRect(65, 63, 16, 13, 3)
  } else {
    context.moveTo(34, 46); context.lineTo(79, 46); context.lineTo(84, 88); context.lineTo(29, 88); context.closePath()
    context.moveTo(45, 53); context.lineTo(45, 38); context.bezierCurveTo(45, 20, 69, 20, 69, 38); context.lineTo(69, 53)
  }
  context.stroke(); context.restore()
}

function artwork(context: CanvasRenderingContext2D, index: number) {
  context.save(); context.beginPath(); context.rect(0, 710, 512, 314); context.clip()
  if (index === 2 || index === 4 || index === 5) {
    const glow = context.createRadialGradient(245, 825, 15, 260, 930, 320)
    glow.addColorStop(0, "#fff2c069"); glow.addColorStop(1, "#00000000")
    context.fillStyle = glow; context.fillRect(0, 710, 512, 314)
    for (let i = 0; i < 3; i++) {
      const x = 54 + i * 125, y = 830 - i % 2 * 60
      const gradient = context.createLinearGradient(x, 0, x + 130, 0)
      gradient.addColorStop(0, "#fff4d45c"); gradient.addColorStop(.28, "#ffffff1a"); gradient.addColorStop(1, "#0000005c")
      context.fillStyle = gradient
      context.beginPath()
      if (index === 5) context.ellipse(x + 60, y + 80, 70, 94, -.35 + i * .3, 0, Math.PI * 2)
      else context.roundRect(x, y, 115, 240, index === 4 ? [55, 55, 0, 0] : 7)
      context.fill()
      if (index === 2) { context.fillStyle = "#ffb0bb55"; context.beginPath(); context.ellipse(x + 57, y, 57, 19, 0, 0, Math.PI * 2); context.fill() }
    }
  } else {
    for (let layer = 0; layer < 5; layer++) {
      const y = 770 + layer * 55
      const wave = (x: number) => y + Math.sin(x / 123 + index * .6 + layer * .6) * (34 + layer * 10) + Math.sin(x / 230 + layer) * 31
      const gradient = context.createLinearGradient(0, y - 70, 0, y + 140)
      gradient.addColorStop(0, index === 6 ? "#e9e5c5dd" : "#fff1df66")
      gradient.addColorStop(.25, index === 6 ? "#c3c7b5bd" : "#ffffff14")
      gradient.addColorStop(1, "#00000055")
      context.beginPath(); context.moveTo(-20, wave(-20))
      for (let x = -20; x <= 540; x += 4) context.lineTo(x, wave(x))
      context.lineTo(540, 1100); context.lineTo(-20, 1100); context.closePath(); context.fillStyle = gradient; context.fill()
      for (let line = 0; line < 19; line++) {
        context.beginPath()
        for (let x = -20; x <= 540; x += 5) { const yy = wave(x) + line * 3; if (x === -20) context.moveTo(x, yy); else context.lineTo(x, yy) }
        context.strokeStyle = index === 6 ? "#3d53472c" : "#fff7ed20"; context.lineWidth = .7; context.stroke()
      }
    }
  }
  context.restore()
}

export function makeArchiveCard(index: number) {
  const { element, context } = canvas(512, 1024)
  const base = context.createLinearGradient(0, 0, 512, 1024)
  base.addColorStop(0, archivePalette[index]); base.addColorStop(.5, archivePalette[index]); base.addColorStop(1, "#241b28")
  context.fillStyle = base; context.fillRect(0, 0, 512, 1024)
  const sheen = context.createRadialGradient(38, 8, 10, 40, 40, 720)
  sheen.addColorStop(0, "#fff3cc28"); sheen.addColorStop(1, "#ffffff00")
  context.fillStyle = sheen; context.fillRect(0, 0, 512, 1024)
  artwork(context, index)
  grain(context, 512, 1024, 0.055)
  context.fillStyle = "#fff9ec"; context.font = "30px Georgia, serif"
  spaced(context, String(index + 1).padStart(2, "0"), 60, 108, 2)
  context.fillStyle = "#fff9ec65"; context.fillRect(128, 98, 47, 1)
  icon(context, index)
  context.fillStyle = "#fffdf1"
  const titleSize = index === 5 ? 45 : index === 3 ? 49 : 57
  context.font = `600 ${titleSize}px Arial, sans-serif`
  titles[index].forEach((line, row) => context.fillText(line, 58, 371 + row * 62))
  const descriptionY = titles[index].length === 1 ? 432 : 492
  context.font = "27px Arial, sans-serif"
  descriptions[index].forEach((line, row) => context.fillText(line, 59, descriptionY + row * 38))
  context.font = "23px Arial, sans-serif"
  const pillWidth = context.measureText(tech[index]).width + 44, pillY = descriptionY + 83
  context.fillStyle = "#ffffff10"; context.strokeStyle = "#fff9eb35"; context.lineWidth = 1
  context.beginPath(); context.roundRect(58, pillY, pillWidth, 57, 28); context.fill(); context.stroke()
  context.fillStyle = "#fff9ec"; context.fillText(tech[index], 80, pillY + 36)
  context.strokeStyle = "#fff7d78c"; context.lineWidth = 2
  context.beginPath(); context.roundRect(3, 3, 506, 1018, 29); context.stroke()
  return texture(element)
}
