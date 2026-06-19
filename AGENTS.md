# Ark Institute Agent Guide

Use this file for work inside `ark-institute`. It extends the parent Ark guide and is specific to the public institute website.

## Project

- This repo is the public Ark Institute website, not the Ark ERP app.
- Repository remote: `git@github.com:mattenarle10/ark-institute.git`.
- Main branch: `main`.
- Production domain used by the app: `https://arkinstitutebc.com`.
- Blog/admin portal link used by the app: `https://portal.arkinstitutebc.com/admin/posts`.
- Blog content API default: `https://api.arkinstitutebc.com`.

## Stack

- Next.js App Router under `src/app`.
- React 19, Next 16, TypeScript.
- Styling is Tailwind CSS plus global CSS in `src/app/globals.css`.
- Animations use Framer Motion, GSAP, and local reveal helpers.
- Icons use `lucide-react`.
- Formatting and linting use Biome.
- `bun.lock` is committed, so prefer Bun when installing or running scripts unless the user asks otherwise.

## Common Commands

- Install dependencies: `bun install`.
- Dev server: `bun run dev`.
- Production build: `bun run build`.
- Start built app: `bun run start`.
- Lint: `bun run lint`.
- Format check/write: `bun run format`.

After meaningful edits, run the smallest useful check. For most code/content changes, run `bun run lint`; for route, metadata, API, or config changes, also run `bun run build`.

## Routes And Content

- Home: `src/app/page.tsx`.
- About: `src/app/about/page.tsx` and `src/app/components/about/*`.
- Courses: `src/app/courses/page.tsx` and `src/app/components/courses/*`.
- Blog index/detail: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, and `src/lib/posts.ts`.
- Contact: `src/app/contact/page.tsx`, `src/app/components/contact/*`, and `src/app/api/contact/route.ts`.
- Admin route: `src/app/admin/[[...path]]/page.tsx` redirects users to the Ark Portal blog manager.

Course listings are currently hard-coded in `src/app/components/courses/courses-list.tsx`:

- `registeredCourses` for TESDA-accredited registered courses.
- `comingSoonCourses` for programs currently "on process".

When updating courses, also check course page metadata in `src/app/courses/page.tsx`, images in `public/images`, and any wording repeated on home/about/CTA sections.

## Blog And Data

- Blog posts are fetched from the Ark API in `src/lib/posts.ts`.
- The API base is `ARK_API_URL`, then `NEXT_PUBLIC_ARK_API_URL`, then `https://api.arkinstitutebc.com`.
- Fetches revalidate every 60 seconds.
- `supabase/schema.sql` documents an older/simple `posts` table shape. Do not assume the public site owns blog editing now; the admin page says blog management moved to the Ark Portal.

## Environment

Do not read or expose secret files unless the user explicitly asks and it is required.

Known environment variables from the code:

- `NEXT_PUBLIC_SITE_URL` for metadata, sitemap, robots, and manifest URL defaults.
- `ARK_API_URL` or `NEXT_PUBLIC_ARK_API_URL` for blog content.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`, `SMTP_FROM`, and `CONTACT_TO_EMAIL` for the contact form.

## Deployment Notes

- There is no committed `vercel.json`, `netlify.toml`, Dockerfile, or GitHub Actions workflow in this repo.
- `README.md` describes standard Next.js deployment and says to set `NEXT_PUBLIC_SITE_URL`.
- `next.config.ts` says `www` redirects should be handled at the hosting provider level and mentions Vercel or Netlify dashboard configuration.
- Because deployment is not encoded in this repo, verify the actual host/provider before changing deploy settings or claiming where it is deployed.

## Conventions

- Keep changes scoped to the public website.
- Follow existing App Router composition: page files assemble components from `src/app/components`.
- Prefer server components by default; use `"use client"` only for state, browser APIs, animation hooks, or interactive UI.
- Keep public assets in `public/images` or `public/logo` and reference them with absolute public paths like `/images/name.png`.
- Use the existing brand colors: Tailwind `primary` `#193a7a` and `accent` `#c80100`.
- Preserve SEO metadata, canonical URLs, sitemap, robots, and Open Graph images when changing routes.
- Contact form changes must preserve server-side validation and HTML escaping.
- Do not revive the retired public-site blog editor unless the user explicitly asks.
- Avoid unrelated refactors and broad design rewrites. Match the current clean, professional school/training-site style.

## Before Finishing

- Check `git status --short`.
- Run the relevant command, usually `bun run lint` and sometimes `bun run build`.
- Summarize exactly which files changed and what was verified.
