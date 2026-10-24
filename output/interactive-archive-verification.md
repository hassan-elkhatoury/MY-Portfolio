# Interactive 3D project archive — 22 October 2026

Reference: `C:/Users/Hassan/Downloads/Things I Built_ Project Archive.png`.

The supplied image guides a modeled scene. Its illustrative project names do not replace Hassan's real portfolio content. Astra implemented the initial scene from the image; integration, material refinement, motion corrections, and browser verification were completed in this workspace.

## Implementation

- React Three Fiber 9, Three.js, and GSAP render and animate a constructed cream presentation box and eight independently interactive cards.
- Beveled panels, a lined hinged lid, internal partitions, paper grain, typeset front lettering, and a woven gold tab use real geometry and locally generated procedural textures.
- Each card has its own mesh, front artwork, physical surface, hover lift, rotation, and click expansion. The reference image is not displayed as the box.
- On opening, the lid clears first (0–0.8 seconds), cards rise in parallel (0.82–1.3 seconds), and then fan out (through 1.925 seconds). Hover selection starts after that sequence. Closing aligns and folds the cards before the lid rotates down.
- A projected card rectangle supplies the origin of the accessible project detail transition.
- The scene loads near the section and uses demand rendering, capped pixel density, local textures, and soft contact shadows. No external models, fonts, or lighting downloads are required for it.
- Motion preferences shorten movements to immediate state changes. The project index provides keyboard access and stays available if WebGL fails or loses its context.
- The Home navigation now uses the same bottom dock as the other sections; the Home-only top placement and separate styling were removed.

## Verified in the local browser

- Desktop WebGL scene loads, opens, fans, closes, and reopens.
- Captured the middle of opening: lid partway open with all cards still lying inside, resolving the reported intersection.
- Hovering MongoShardLab independently lifts and rotates its card.
- Clicking InterviewAI on the 3D canvas expands into its actual project content.
- Mobile 390 × 844: full box remains within page width, no horizontal overflow, and tapping Qt Messenger opens its project.
- Reduced-motion emulation: archive opens/closes instantly, keyboard Enter opens Qt Messenger, and Escape dismisses it. Emulation was removed afterward.
- Desktop 1366 × 900: Home navigation remains fixed 22 pixels above the viewport bottom.
- Targeted ESLint: passed with no errors or warnings in the archive scene, wrapper, modal integration, and new geometry/texture modules.

Production build completed successfully before the Journey rebuild: compilation, TypeScript, all 16 static pages, and final build traces passed. The new Journey build is recorded separately in `journey-phase-a-verification.md`.

## Practical limits

The scene recreates the reference composition using browser-rendered geometry and procedural artwork; it is not a pixel-identical offline Blender render. Browser checks cover desktop Chromium and a phone-sized viewport, not physical iOS/Safari devices. No field performance benchmark has been claimed.

## API references consulted

- [React Three Fiber installation and React version pairing](https://r3f.docs.pmnd.rs/getting-started/installation)
- [React Three Fiber demand rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [GSAP Tween lifecycle](https://gsap.com/docs/v3/GSAP/Tween/)
