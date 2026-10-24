# Skills Toolbox — phase A

Scope: the closed-box visual foundation from the supplied Skills Toolbox brief. The brief requires one subphase at a time and approval after each handoff.

## Implemented

- Genuine 3D cardboard carton with separate hollow walls, floor, and four flaps, each parented to its physical hinge edge.
- Locally generated kraft-paper grain, printed front/side labels, top sealing strip, restrained warm lighting, and soft ground shadows.
- Closed initial state with skills hidden, an invitation, a small hover/focus response, and keyboard-operable activation.
- Deferred scene loading, capped pixel density, demand rendering, texture/geometry cleanup, and a CSS fallback when WebGL is unavailable.
- Day/night lighting, responsive camera framing, and reduced-motion support for the new hover response and invitation.
- The existing HTML skill inventory, evidence panels, Store/Retrieve buttons, and close/reset flow are preserved. The open carton is currently a static pose, used to validate wall/flap construction; phase B will add the coordinated opening sequence and floating tiles.

## Files

- `components/portfolio/toolkit-box-scene.tsx` — model, camera, lights, shadows, hover response, and WebGL error boundary.
- `lib/toolkit-box-textures.ts` — deterministic paper, ink, tape, and ambient shadow textures.
- `components/portfolio/toolkit.tsx` — lazy scene integration, native activation controls, and existing inventory integration.
- `components/portfolio/toolkit-workbench.css` — presentation sizing, invitation, focus states, fallback, and theme styles.
- `DESIGN.md` — updated implementation scope.

## Verification

- TypeScript: passed, including the production build check.
- Targeted ESLint: passed for the three edited/new TypeScript files.
- Browser: initial closed state and four-flap open pose inspected; keyboard Enter opens and closes the toolbox.
- Mobile 390 × 844: no horizontal overflow (page width 375px); box, invitation, and bottom navigation remain usable.
- Day and night appearances inspected. Motion pause stops the invitation cue; keyboard activation still works while paused.
- Existing Java Store/Retrieve and close/reset controls verified in the production browser.
- Browser console: no errors during interaction checks.
- Production build: passed after the final mobile shadow adjustment, with all 16 static pages generated.
- Final production scene inspected at the default laptop viewport and 390 × 844. The key light was raised to keep the cast shadow inside the mobile scene.
- Review screenshots: `output/playwright/toolkit-phase-a-desktop.png` and `output/playwright/toolkit-phase-a-mobile.png`.
- Production server is running at `http://localhost:3000`.

## Review and remaining work

Open `http://localhost:3000/#skills`. Review the closed box, hover it, tab to the box or invitation, and press Enter. The existing skill list is still available after opening.

Phase B adds the press response, sequenced flaps, warm interior light, Java-first tile emergence, and reference-inspired floating arrangement. Phase C adds the new selection choreography, phase D physical drag/storage/retrieval, and phase E final polish. These are not claimed as completed by phase A.
