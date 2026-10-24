# Hassan El Khatoury — Personal Portfolio

An interactive engineering portfolio inspired by [James Chugh's portfolio](https://www.jameschugh.com/), personalized with Hasan's actual work, education, experience, and credentials.

## Experience

- Day/night developer workspace matched to the supplied references, with separately generated city, desk, and seated foreground layers, spring-driven hover depth, and scroll parallax.
- The Java editor, InterviewAI, and MEF screen visuals are baked into the generated desk artwork, with transparent links over each screen leading to the project pages. Live city markers connect to the career journey, projects, and contact section; compact layouts have larger equivalent links.
- Portrait illustration generated from the original portfolio photo.
- Draggable personal notes and a portrait polaroid.
- Watercolor career atlas with 3D terrain relief, pointer-controlled tilt, animated water, and a modeled sailboat with a trailing wake. Eight real milestones, separate Field Notes, a full-map opening view, optional scroll-driven camera, and keyboard accessible controls share the same timeline. The lazy scene pauses offscreen and respects reduced motion, with an illustration fallback if WebGL fails. See `output/journey-motion-verification.md` for validation and its limits.
- Eight projects in a React Three Fiber archive matched to the supplied cream-box reference: modeled paper panels, a hinged lid, a woven gold tab, and independently clickable cards. GSAP opens the lid before lifting and fanning the cards, and reverses that sequence on closing. Project details retain browser-history support and eight shareable `/projects/[slug]` pages.
- A consistent bottom navigation dock on Home and every subsequent section.
- Three shareable case studies at `/work/mef-fleet-management`, `/work/interview-ai`, and `/work/modeya`, with documented scope, implementation decisions, and architecture diagrams.
- Selected work after the journey, including a genuine capture of MODEYA's public storefront and interactive, labeled architecture diagrams.
- PFE 2027 availability and a direct work link in the hero, plus a persisted pause/resume control that respects system reduced motion.
- Twelve credentials with original verification links and PDFs.
- A toolkit that starts closed, opens into seven skill groups, and supports real dragging, storing, retrieval, reset, and keyboard alternatives. Skill details link to documented project evidence.
- Contact keyboard, email copying, resume, social links, and a Formspree message form.
- Responsive layouts, visible keyboard focus, and reduced motion support.
- Original day and night cloud artwork, responsive WebP assets, and a non-blocking theme crossfade. Saved preferences override the system default.

## Run locally

Use Node.js 22 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Production checks:

```sh
pnpm lint
pnpm exec tsc --noEmit --incremental false
pnpm build
pnpm start
```

The development and production scripts use Next.js's Webpack bundler to avoid a Tailwind/Turbopack resolution failure in this Windows checkout. The framework remains Next.js 16, React 19, and Tailwind 4.

## Edit content

The source of truth is `lib/portfolio-data.ts`. Edit profile, projects, experience, education, certifications, or skill groups there. Active sections are in `components/portfolio/`, and shared design tokens are in `app/globals.css`.

The contact form uses the existing Formspree form ID. Submission happens only when a visitor sends the form. Client validation, loading, success, and failure states are included.

Design and asset notes, including the illustration prompt, are in `DESIGN.md`. Public project images, credentials, and resume remain in `public/`.

The latest implementation and verification report is `output/redesign-verification.md`. Prompts and asset provenance are recorded in `output/sky-artwork-provenance.md` and `output/workspace-artwork-provenance.md`. Run the production build with the development server stopped so generated Next.js types cannot change during validation.

Designed and developed by [Hassan El Khatoury](https://github.com/hassan-elkhatoury).

