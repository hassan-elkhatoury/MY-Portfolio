const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

/** The overview fits every coordinate to the panel; following a stop uses a closer camera. */
export function journeyFrame(width: number, height: number, overview: boolean, point: { x: number; y: number }) {
  if (overview) return { x: 0, y: 0, scaleX: width / 1800, scaleY: height / 900 }
  const zoom = Math.max(width / (width < 600 ? 1000 : 1620), height / 900)
  return {
    x: clamp(width * .55 - point.x * zoom, Math.min(0, width - 1800 * zoom), 0),
    y: clamp(height * .56 - point.y * zoom, Math.min(0, height - 900 * zoom), 0),
    scaleX: zoom,
    scaleY: zoom,
  }
}
