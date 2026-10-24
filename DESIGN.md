# Portfolio redesign

## Current implementation — phases 0–10

The current portfolio uses one warm paper and coral design system, with a coordinated midnight-blue alternative. Shared spacing, type sizes, content width, navigation clearance, and responsive breakpoints connect the workspace, journey, work, personal notes, credentials, toolkit, and contact scene.

The latest homepage replaces the valley with the user's day/night developer-workspace reference. Five generated WebP assets separate the city, daytime desk, nighttime desk, and seated foreground. Four independently moving layers use spring-driven pointer depth with a slight perspective tilt; the scene also responds to scrolling. This is layered 2.5D artwork, not a fully modeled room. The three screens use generated Java, InterviewAI, and MEF interface artwork baked into the desk image. Transparent links over the screen glass lead to the real project pages; no separate HTML screen panels are rendered. The screen art is illustrative. Live text, five city markers, a working introductory dialog, recreate the reference composition; the shared frosted navigation stays at the bottom. Phone layouts use larger project links and a stable crop. Decorative movement respects pause and reduced motion.

Native scrolling drives the illustrated eight-stop journey, its moving camera and traveler, and reversible chapter transitions. Both navigation systems share one active-section store. The dock uses a moving active pill; buttons do not chase the pointer.

The archive uses React Three Fiber and GSAP to reproduce the supplied cream presentation-box reference with real beveled geometry, paper textures, a brown lined lid, a woven gold tab, and eight individual colored cards. Opening clears the lid first, lifts parallel cards, and then fans them out; closing reverses the sequence to prevent intersections. Hover lifts and rotates a card. Clicking brings it forward and expands into the existing accessible project detail surface. Escape, browser history, and direct hash links are supported; eight server-rendered project pages retain permanent URLs and meaningful text. The project index provides keyboard access and a fallback if WebGL is unavailable. The engineering atlas uses selectable layers and explanatory text, with decorative signals active only while visible.

The seven-category skills toolbox starts closed. The reference rebuild's phase A replaces the former CSS carton with a real React Three Fiber model: separate walls, a floor, four edge-hinged flaps, kraft fibre material, printed face labels, sealing tape, and soft ground shadows. Its runtime loads near the section, renders on demand, caps pixel density, and disposes generated textures and geometry. Hover gives a small physical response; native buttons provide keyboard activation and a CSS fallback remains available without WebGL. The existing category, detail, Store/Retrieve, and close/reset controls remain functional. The new cinematic opening, floating 3D skill tiles, and physical storage choreography are later approval-gated phases; the current open model is a static structural pose.

The contact scene uses separate original daytime and moonlit sky artwork. Responsive WebP derivatives, slowly moving atmosphere, refined tactile keys, and intentional dark form materials replace the old enlarged cloud texture. Theme changes crossfade locally without a blocking full-screen snapshot. System preferences apply by default; explicit day/night and motion preferences persist.

The archive loads its WebGL runtime only near the section and renders on demand, with capped pixel density and procedural local textures. It does not download a Blender model or external lighting assets. The main navigation uses the same bottom dock on Home and every other section. Large displayed PNGs have optimized WebP alternatives, Next Image optimization is enabled, and decorative loops stop when their scene is offscreen or motion is paused. All eight projects, twelve credentials, seven skill groups, résumé, and supplied professional details remain represented.

See `output/redesign-verification.md` for final checks and limitations, and `output/sky-artwork-provenance.md` and `output/workspace-artwork-provenance.md` for original prompts and asset paths.

## Historical design notes

The notes below record earlier iterations. Counts, theme transitions, old toolbox behavior, and tooling status in these historical notes are superseded by the current implementation above.

## Phase 1: layout and design system

The shared layout now uses a 1160px content width, fluid page gutters, one heading scale, consistent section spacing, and clearance for the fixed navigation dock. The hero, main sections, and case-study pages use these same alignment rules. The three selected case studies each use a matched text/visual row, stacking at tablet widths. Their images remain uncropped, with documented system layers placed directly below each visual.

The project index retains all eight projects. Four columns become two on phones, with shared grid tracks aligning project names and categories across each row. Navigation targets remain usable at 320px, the contact keys reflow on narrow screens, certification papers stack earlier, and personal notes use a single column on small phones. The skip link targets the main content after the navigation. No dependencies or later-phase interaction features were added.

Phase 1 verification includes production compilation, TypeScript, responsive browser checks from 320px to 1440px, and opening all eight project dialogs with Escape dismissal and focus restoration. ESLint remains unavailable in the existing dependency setup. Phase 2 is the cinematic scroll and transition pass.

## Scroll-driven journey atlas

The Journey uses the original watercolor terrain as the texture of a shallow 3D relief mesh. Pointer movement tilts the landscape and the matching HTML/SVG route together. A water-only shader adds flow and highlights; a modeled sailboat follows a continuous water route with rocking cloth sails and a curved wake. The scene loads near the viewport, renders on demand at up to 30 fps while visible, and freezes for reduced motion or a hidden tab. The illustration remains the WebGL fallback. Its eight milestones preserve the portfolio content. A cream atlas frame and separate rounded Field Notes panel sit below serif editorial headings, with the timeline below and space reserved for the fixed navigation dock. The map starts in overview; route-following remains available. Narrow maps prioritize the active label to keep the landscape readable.

Native page scrolling drives a sticky viewport. One normalized timeline controls the selected story, route drawing, and traveler position; a spring camera follows the traveler. Each route segment is measured once using the browser's SVG geometry API. Motion values update the drawing without rendering React on every scroll frame; story state changes only when a milestone changes. Explore, the ENSAH/MEF hero landmarks, map markers, arrow buttons, and timeline buttons all navigate to positions on that timeline. The skip link provides direct access to selected work.

Full-map view fits the complete route. Paused animations and system reduced motion use this stationary overview with immediate navigation. Small screens stack the map and story, expose details through a disclosure, and keep the route controls above the dock. Both day and night themes are supported. Existing portrait references now use the available `hasan-portrait.png` asset.

Reference: https://www.jameschugh.com/

Visual thesis: a personal, painterly world with a warm paper canvas, expressive Bricolage Grotesque typography, hand-drawn highlights, and objects that invite exploration.

Content plan: landscape introduction → personal story and notes → education and experience journey → six actual project cards → twelve real credentials → interactive engineering toolkit → contact keyboard and message form.

Recruiter-focused extension: retain the painterly world, Bricolage typography, warm paper, yellow highlighter, coral details, physical project box, and keyboard contact panel. The hero now states the Java/Spring student focus and PFE 2027 search, with a direct link to selected work. A wide MEF feature followed by paired InterviewAI and MODEYA studies brings the strongest backend evidence earlier in the page. Existing anchors remain available.

Three server-rendered case studies are available at `/work/mef-fleet-management`, `/work/interview-ai`, and `/work/modeya`. They show the problem, actual contribution, application boundaries, supported technical decisions, source-based validation scope, and takeaways. Labeled diagrams explain the documented layers; they are not presented as application screenshots. MODEYA's live public storefront was captured at `https://www.modeya.page/` and saved as `public/images/projects/modeya-storefront.webp` (1411 x 697, approximately 58 KB). InterviewAI uses its original screenshot. No admin screens, customer records, fake results, or invented endorsements were added. MODEYA's 18-table figure refers to the documented project scope; the case study distinguishes the expanded current schema.

Global motion preferences respect system reduced motion and store an explicit pause choice under `portfolio-motion-paused-v1`. An early script applies the preference before hydration. Pausing freezes CSS loops, stops pointer/scroll transforms, and bypasses the circular theme reveal; record audio remains under its own control. The overview and case-study content are server components; interactive leaves use client state.

Interaction thesis: layered pointer and scroll parallax in the valley; tactile cards, notes, and keyboard controls; selectable map milestones and project dialogs. Reduced motion removes travel and continuous animation.

## Independent scenery depth

The fixed Night/Day button reveals the new theme as a 1-second expanding circle, starting at the button center and growing beyond the furthest viewport corner. Native document view-transition snapshots include the landscape, content, and fixed controls. Theme updates are flushed before snapshot capture; repeated clicks are guarded until the reveal ends. The day direction uses the same expanding reveal. Reduced motion and browsers without the API apply the theme immediately.

The hero renders separate transparent sky/cloud, hill, building and foreground assets. Each cutout gets an independent spring-driven transform, with pointer travel ranging from 3px in the sky to 54px in the nearest foreground. A slight perspective tilt ties the layers together. Landmark labels share their building's movement distance; the character has its own near-camera layer. Text and navigation stay steady. Pointer departure returns the scene to center, touch input does not activate hover movement, and reduced motion freezes the depth effect.

The flattened `bg.webp` is no longer rendered. A clean plate fills the gaps between cutouts without duplicate buildings. Desktop scenery extends 60px beyond the viewport to cover movement at the edges. Hover depth is disabled below 700px, including on narrow windows with a mouse, so the mobile crop stays stable.

Built-in ImageGen clean-plate edit, saved as `public/images/valley/landscape-clean.webp`: remove all buildings, towers, balloon, terraces, umbrellas and other man-made objects from the original backdrop; fill with natural rolling green hills, trees, distant blue-green valley, grass and the winding stone path on the right; preserve the wide composition, sky horizon, blue cumulus sky and warm green/blue painterly palette. Hill cutouts supplied as style references. No people, text, logos or overlays. The generated original remains in the Codex generated-images directory.

## Work division

Project-box refinement: match the supplied open stationery-box reference with a pale gold hinged lid, shallow front lip, coherent isometric planes, six upright colorful project cards, and a compact project index below. Hover or keyboard focus lifts the corresponding card; clicking either a card or its index opens the existing factual project details. Keep the complete box visible at narrow widths by scaling the composition, with readable project names underneath.

Contact-footer refinement: surround a cream graph-paper panel with the painterly cloud sky. Five individually raised keys use the actual email, GitHub, LinkedIn, message form, and résumé destinations. Hand-drawn coral arrows connect each key to a short caption. The M/G/L/S/R shortcuts operate while the keyboard panel has focus; S opens the existing form and focuses its first field. The panel adapts to narrow screens, and the night theme dims the sky while preserving the warm cream paper and readable dark ink.

Toolbox refinement: use a single coherent SVG drawing for the open cardboard box, including its interior, folded flaps, front and side faces, packing tape, and Java sticker. Ten independent colored tool tiles surround the box with consistent depth and clear gaps. The entire scene scales together on narrow screens and short desktops; each tool still selects its real skill category and the category tabs retain keyboard navigation.

1. Shared content extraction and typed data.
2. Reference inspection, landscape hero, navigation, shared visual system, and integration.
3. Physical project box, six project covers, and accessible details.
4. Journey map and certification papers.
5. Personal story, toolkit, and contact keyboard/form.
   Added the reference's record-player interaction using original browser-generated ambient chords.
6. Responsive browser checks, keyboard checks, type checking, production build, and final polish.

Actual portfolio information lives in lib/portfolio-data.ts. Existing project images, certificate PDFs, experience, education, and social links are preserved. No visitor numbers, testimonials, hobbies, or impact metrics were invented.

October 2026 content update: use the supplied Java Backend CV, Software Engineer CV, and master profile for Hassan's name, Marrakech location, Java/Spring skills, languages, and 2027 PFE search. The career route now has eight milestones, including MODEYA freelance development (March–June 2026) and the MEF internship (July–September 2026). The project box now holds seven projects, including MODEYA with its documented 18-table PostgreSQL schema. Both supplied CVs agree on preparatory studies in 2022–2024 and engineering studies in 2024–2027, so those dates take precedence over the conflicting master-profile dates. Existing verified Oracle certificates support the dual Java credential.

The default résumé is the unmodified supplied `Hassan_El_Khatoury_CV_Java_Backend.pdf`. Its SHA-256 matches the user's source file. The old `my_resume.pdf` URL also serves this Java CV so previously shared links stay current. Project URLs are shown only when supplied; MODEYA has no fabricated repository or live URL.

Decorative landscape layers were acquired from the requested reference's rendered page (/v2/h/). The reference's personal photos, character, employer logos, project work, and writing are not used. The portrait is the original portfolio's committed profile image, recovered under a new filename because the original path was already deleted in the checkout.

## Illustrated character

Built-in ImageGen was used with the portfolio portrait as an identity reference. Final project asset: public/images/hasan-illustration.webp.

Prompt: create a single full-body, transparent hand-painted gouache character of Hasan, preserving his face, dark curly hair, skin tone, and friendly expression; standing and waving in a dark navy blazer, white open-collar shirt, dark trousers, and light sneakers; warm daylight; no scenery, text, logos, or frame. The complete figure is visible and the original generated PNG remains in the Codex generated-images directory.


