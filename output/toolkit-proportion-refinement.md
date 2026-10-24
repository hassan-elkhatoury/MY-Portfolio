# Toolkit reference proportion refinement

The user's rendered screenshot showed oversized tiles crowding the front of a small carton. The reference has a more generous box beneath two airy rows of smaller objects.

Changes:
- Desktop tile width cap: 148px to 116px; logo size: 80px to 56px.
- Smaller tablet and mobile logo sizes; preserve native selection and storage controls.
- Raised and separated the featured rows. Reduced embossed edge thickness to 3px and softened their shadows.
- Increased the open carton presentation height from 315px to 370px and its available width from 590px to 650px.
- Lowered the camera and moved it toward the front; widened framing for the spread flaps.
- Flattened the open flaps so they cover less of the front face, enlarged/lowered the MY SKILLS print, and added restrained warm interior lighting.
- Removed the sharp projected ground shadow; retained carton self-shadowing and a soft procedural contact shadow.
- Used Devicon's plain Docker silhouette from the existing pinned source.

The implementation remains independent SVG/CSS tiles with a Three.js carton. It is not a static reference image. Exact visual equivalence is not claimed: browser access remains blocked by the earlier browser policy denial. Layout changes were based on the user's actual screenshot and reference image.

Validation: targeted ESLint passed, diff whitespace checks passed, and the final production build passed TypeScript and generated all 16 static pages. Production server restarted on port 3000 with the final camera framing included.
