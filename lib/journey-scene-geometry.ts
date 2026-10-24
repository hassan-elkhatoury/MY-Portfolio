import { BufferGeometry, CatmullRomCurve3, Float32BufferAttribute, PlaneGeometry, Vector3 } from "three"

export const ATLAS_WIDTH = 1800
export const ATLAS_HEIGHT = 900
export const ATLAS_BLEED = 120

// Screen coordinates, following the open water below the bridge and around the bay.
// A closed curve gives the boat a continuous heading, without a teleport at the end.
export const sailingRoute = new CatmullRomCurve3([
  [1135, 638], [1230, 689], [1280, 760], [1190, 817],
  [1000, 850], [800, 842], [715, 810], [820, 802],
  [1010, 817], [1150, 780], [1200, 720], [1165, 675],
].map(([x, y]) => new Vector3(x - ATLAS_WIDTH / 2, ATLAS_HEIGHT / 2 - y, 2)), true, "centripetal")

export function waterCoverage(r: number, g: number, b: number) {
  const ramp = (value: number, low: number, high: number) => {
    const t = Math.max(0, Math.min(1, (value - low) / (high - low)))
    return t * t * (3 - 2 * t)
  }
  return ramp(g - r, 8, 28) * ramp(b - r, 5, 24)
}

export function atlasHeight(x: number, y: number, water: number) {
  const hill = (cx: number, cy: number, rx: number, ry: number, height: number) =>
    height * Math.exp(-2 * (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2))
  const relief = 4
    + hill(360, 175, 310, 170, 108)
    + hill(570, 205, 170, 120, 55)
    + hill(1370, 170, 260, 180, 68)
    + hill(1430, 490, 300, 150, 42)
    + hill(370, 530, 360, 220, 22)
  const edge = Math.max(0, Math.min(1, x / 55, (1800 - x) / 55, y / 45, (900 - y) / 45))
  return relief * (1 - water) * edge
}

export function makeAtlasRelief(image: CanvasImageSource) {
  const canvas = document.createElement("canvas")
  canvas.width = 360
  canvas.height = 180
  const context = canvas.getContext("2d", { willReadFrequently: true })!
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height)
  // Continue the texture's edge pixels beyond the panel. The original art and
  // route coordinates remain unchanged while the tilt can no longer reveal gaps.
  const geometry = new PlaneGeometry(ATLAS_WIDTH + ATLAS_BLEED * 2, ATLAS_HEIGHT + ATLAS_BLEED * 2, 204, 114)
  const positions = geometry.getAttribute("position")
  const uv = geometry.getAttribute("uv")
  const water = new Float32Array(positions.count)
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i) + ATLAS_WIDTH / 2
    const y = ATLAS_HEIGHT / 2 - positions.getY(i)
    const px = Math.max(0, Math.min(canvas.width - 1, Math.round(x / ATLAS_WIDTH * (canvas.width - 1))))
    const py = Math.max(0, Math.min(canvas.height - 1, Math.round(y / ATLAS_HEIGHT * (canvas.height - 1))))
    const pixel = (py * canvas.width + px) * 4
    water[i] = waterCoverage(data[pixel], data[pixel + 1], data[pixel + 2])
    positions.setZ(i, atlasHeight(x, y, water[i]))
    uv.setXY(i, x / ATLAS_WIDTH, 1 - y / ATLAS_HEIGHT)
  }
  geometry.setAttribute("aWater", new Float32BufferAttribute(water, 1))
  geometry.computeVertexNormals()
  return geometry
}

/** A curved cloth surface, rather than a flat triangle facing the camera. */
export function makeSail(left: boolean) {
  const geometry = new BufferGeometry()
  const vertices: number[] = []
  const indices: number[] = []
  const rows = 12
  for (let row = 0; row <= rows; row++) {
    const height = row / rows
    const width = (1 - height) * (left ? -29 : 24)
    for (let col = 0; col <= rows; col++) {
      const across = col / rows
      vertices.push(width * across + (left ? -2 : 2), 11 + height * (left ? 57 : 47), Math.sin(across * Math.PI) * (1 - height) * 9)
      if (row < rows && col < rows) {
        const start = row * (rows + 1) + col
        indices.push(start, start + 1, start + rows + 1, start + 1, start + rows + 2, start + rows + 1)
      }
    }
  }
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}
