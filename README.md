# Hassan El Khatoury — Personal Portfolio

An interactive engineering portfolio inspired by [James Chugh's portfolio](https://www.jameschugh.com/), personalized with Hasan's actual work, education, experience, and credentials.

## Experience

- Layered painted landscape with pointer and scroll parallax, animated clouds, and a day/night switch.
- Clickable ENSAH, MEF, Java, and Oracle Cloud landmarks.
- Portrait illustration generated from the original portfolio photo.
- Draggable personal notes and a portrait polaroid.
- Career route with eight real milestones and keyboard accessible controls.
- Seven projects presented in a physical card box, with accessible screenshot dialogs.
- Three shareable case studies at `/work/mef-fleet-management`, `/work/interview-ai`, and `/work/modeya`, with documented scope, implementation decisions, and architecture diagrams.
- Selected work immediately after the hero, including a genuine capture of MODEYA's public storefront.
- PFE 2027 availability and a direct work link in the hero, plus a persisted pause/resume control that respects system reduced motion.
- Twelve credentials with original verification links and PDFs.
- Interactive engineering toolbox with seven skill groups.
- Contact keyboard, email copying, resume, social links, and a Formspree message form.
- Responsive layouts, visible keyboard focus, and reduced motion support.

## Run locally

Use Node.js 22 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Production checks:

```sh
pnpm exec tsc --noEmit --incremental false
pnpm build
pnpm start
```

The development and production scripts use Next.js's Webpack bundler to avoid a Tailwind/Turbopack resolution failure in this Windows checkout. The framework remains Next.js 16, React 19, and Tailwind 4.

## Edit content

The source of truth is `lib/portfolio-data.ts`. Edit profile, projects, experience, education, certifications, or skill groups there. Active sections are in `components/portfolio/`, and shared design tokens are in `app/globals.css`.

The contact form uses the existing Formspree form ID. Submission happens only when a visitor sends the form. Client validation, loading, success, and failure states are included.

Design and asset notes, including the illustration prompt, are in `DESIGN.md`. Public project images, credentials, and resume remain in `public/`.

Designed and developed by [Hassan El Khatoury](https://github.com/hassan-elkhatoury).
