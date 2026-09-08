# Perfect Science Academy website

A premium, responsive public website for Perfect Science Academy in 160 GB Kalyki, Gojra. Built with Next.js, TypeScript, Tailwind CSS and Motion.

## Routes

- `/` — cinematic 14-section academy story
- `/faculty` — faculty profiles and contact details
- `/results` — complete supplied SSC and Class 9 results for 2026
- `/admissions` — frontend-only enquiry flow that continues on WhatsApp
- `/promos` — reusable social-poster concepts

## Local development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run lint
npm run typecheck
npm run build
```

## Image locations

The layout shows designed placeholders until real images are added at:

```text
public/images/teachers/usman.jpg
public/images/teachers/sajid.jpg
public/images/teachers/shahzaib.jpg
public/images/academy/classroom-1.jpg
public/images/academy/classroom-2.jpg
public/images/academy/classroom-3.jpg
```

Academy facts and page content are maintained centrally in `src/data/academy.ts`.
