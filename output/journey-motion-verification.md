# Animated 3D Journey — 24 October 2026

The latest request explicitly authorizes a 3D map, sailing boat, and moving water. The existing illustrated atlas, career content, and navigation remain in use.

## Implementation

- React Three Fiber renders the atlas on a 16,471-vertex relief mesh. Mountain and hillside elevations give the painted landscape depth.
- The pointer drives a damped 3D tilt. The same motion values rotate the HTML/SVG route, keeping milestone hit targets aligned with the map plane.
- A shader distorts and highlights turquoise water while preserving the land and architecture. Small vertex ripples add surface movement.
- The sailboat has an extruded hull, deck, cabin, mast, curved cloth sails, and pennant. It follows a continuous 100-second loop through the river mouth and bay, with buoyancy, rocking, sail movement, and two curved wake ribbons.
- The 3D code loads near the viewport. Animation stops offscreen, when the document is hidden, or when reduced motion is enabled. Pixel density is capped at 1.25; active animation requests at most 30 frames per second.
- The original illustration and separate boat remain as a fallback for loading, WebGL/context loss, shader failure, or an error boundary.
- Container queries reduce marker/label density on narrow maps. The final milestones place their active callout beside the pin instead of over the next stop.

## Checks

- TypeScript: passed before the production build.
- Targeted ESLint: passed for all four new/edited TypeScript files.
- Geometry: 1,000 points sampled along the boat centerline against the actual artwork. Minimum neighborhood water coverage was 0.695; no sample fell below the 0.6 shoreline threshold. This is a pixel-based check, not visual inspection.
- The loop's endpoint heading dot product was 0.9994, avoiding a heading jump at the seam. Terrain/sail vertices and normals were checked for finite values. Water height and mountain relief were checked.
- Full numerical results: `output/journey-motion-geometry-check.json`.
- Browser/GPU rendering and interactions have not been visually verified in this turn because browser access was unavailable. No screenshot or browser-pass claim is made.

- Production build: passed, including TypeScript and all 16 static pages.
- Local production server restarted successfully on port 3000 (PID 41624). Startup log reports ready; TCP listener confirmed. No HTTP/browser verification was performed.

## Canvas sizing correction

The subsequent user screenshot exposed a canvas shrinking twice inside the CSS-transformed journey world. React Three Fiber's default measurement used transformed bounds, then wrote those smaller dimensions back to the canvas before the parent scale applied again.

The journey Canvas now sets `resize={{ offsetSize: true, scroll: false }}`. Measurement uses the original 1800 × 900 layout, and the existing parent transform handles viewport zoom once. The 3D relief, boat, and route keep the same coordinate system.

`output/journey-canvas-sizing-check.cjs` exercises the installed measurement library with controlled element dimensions, then verifies the orthographic projection for all eight stops, six scales, and nine tilt combinations (432 checks). It reproduces the old double-scale result and passes with the corrected options. This is a numerical regression check, not browser rendering verification.

The sizing correction passed targeted ESLint and a complete production build (all 16 static pages). The local server was restarted with the finished build on port 3000, PID 19804. Browser rendering remains unverified.
