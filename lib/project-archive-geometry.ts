import { ExtrudeGeometry, Shape, ShapeGeometry } from "three"

export function archiveOutline(width: number, height: number, radius: number) {
  const x = -width / 2, y = -height / 2
  const shape = new Shape()
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  return shape
}

export function archivePanel(width: number, height: number, depth: number, radius = 0.035) {
  const geometry = new ExtrudeGeometry(archiveOutline(width, height, radius), {
    depth, bevelEnabled: true, bevelSize: 0.014, bevelThickness: 0.014,
    bevelSegments: 2, curveSegments: 8, steps: 1,
  })
  geometry.translate(0, 0, -depth / 2)
  return geometry
}

export function archiveFace(width: number, height: number, radius: number) {
  const geometry = new ShapeGeometry(archiveOutline(width, height, radius), 12)
  const position = geometry.getAttribute("position")
  const uv = geometry.getAttribute("uv")
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, position.getX(i) / width + 0.5, position.getY(i) / height + 0.5)
  }
  return geometry
}
