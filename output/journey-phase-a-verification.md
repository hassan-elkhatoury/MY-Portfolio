# Journey rebuild — subphase A

Date: 23 October 2026.

Scope: the latest Journey brief's **static visual foundation**. The Skills Toolbox brief remains queued. Both supplied briefs explicitly require approval after each subphase; no new interaction or environmental-animation phase has been started.

## What changed

- Separate rounded atlas and Field Notes surfaces, warm paper tones, serif headings, coral accents, and a compact eight-stop timeline follow the supplied reference.
- A new original watercolor landscape replaces the sparse vector terrain. It is decorative artwork only: route paths, milestone buttons, dates, labels, compass, boat, and content remain separate HTML/SVG/React elements.
- The atlas opens in an overview showing all eight stops. The existing optional route-following view and scroll controller remain available.
- The Field Notes panel uses real education, experience, and certification data. Its disclosure and previous/next controls stay visible while longer content scrolls inside the panel.
- The marker number remains visible above the traveling route dot. Later milestones were moved away from the lower map caption.
- Mobile stacks the map and notes; no page-width overflow was found. Long notes use an internal scroll area at small viewport heights.
- Light/dark colors and the existing reduced-motion mechanism are retained. No new permanent animation loop or dependency was introduced.

## Files

- `components/portfolio/journey.tsx` — layout, labels, content hierarchy, map coordinates.
- `components/portfolio/journey.css` — atlas layout, responsive surfaces, typography, theme styles.
- `components/portfolio/journey-terrain.tsx` — decorative terrain and separate SVG boat.
- `public/images/journey/curiosity-atlas-terrain.webp` — 1774 × 887 artwork, 523,744 bytes.
- `output/journey-atlas-art-direction.md` — exact built-in image-generation prompt and asset provenance.

## Checks

- TypeScript check: passed.
- Targeted ESLint for the two edited React files: passed.
- Browser: default laptop viewport, desktop 1440 × 900, and mobile 390 × 844 inspected.
- Timeline selection opens the actual OCI milestone and updates the map and notes.
- Overview displays all eight map controls; normal selection and the existing route view remain usable.
- Day and night appearances inspected.
- Keyboard Enter opens and closes the details disclosure and exposes the real credential data.
- Mobile page width stayed within the viewport.
- Browser console: no errors during the checks.
- Production build: passed; all 16 static pages generated, with TypeScript and final optimization completed.
- Production server: running at `http://localhost:3000`; the finished atlas and OCI milestone were verified against the production build.

## Review

Open `http://localhost:3000/#journey`, choose **2025 / Into the cloud** in the timeline, and compare it to the supplied reference. Use the day/night control and open **The details**. The bottom navigation remains available.

Screenshots: `output/playwright/journey-phase-a-desktop.png` (production, default laptop viewport) and `output/playwright/journey-phase-a-mobile.png` (390 × 844 responsive check).

## Remaining phases (approval required)

Journey B: core selection/controller improvements and interaction checks.

Journey C: route, panel, node, and parallax choreography.

Journey D: animated river, boat, and atmosphere.

Journey E: final responsiveness, accessibility, performance, and motion polish.

Skills Toolbox A–E: closed box foundation; opening choreography; selection; dragging/storage/retrieval; final polish. None of these new toolbox subphases has been implemented in this change.
