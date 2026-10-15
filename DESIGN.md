# Portfolio redesign

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
