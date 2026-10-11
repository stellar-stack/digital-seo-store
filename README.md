# Digital SEO Store — Website

Marketing website for Digital SEO Store, in English, French and Spanish (`/en`, `/fr`, `/es`).
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next-intl and Framer Motion.
Form submissions (contact form and newsletter) are stored in a Supabase database.

---


## Requirements

- **Node.js 20.9 or newer** (check with `node -v`)
- npm (comes with Node.js)
- A free [Supabase](https://supabase.com) project, for the forms (see [Forms and database](#forms-and-database))

## Quick start (local development)

```bash
npm install
cp .env.example .env.local     # then fill in the Supabase values
npm run dev
```

Open http://localhost:3000. Without the Supabase values the site still runs, but form submissions show an error message instead of being saved.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build (run before deploying; fails on TypeScript errors) |
| `npm run start` | Serves the production build (port 3000, or the `PORT` environment variable) |
| `npm run lint` | ESLint |

## Project layout

| Path | Contents |
|---|---|
| `src/app/[locale]/` | Pages and routes, one folder per page |
| `src/components/` | UI: `sections/` (page sections), `blog/` (blog post page), `layout/` (header, footer), `ui/` (shared pieces) |
| `messages/en.json`, `fr.json`, `es.json` | All site text, per language |
| `src/content/blog/<post>/{en,fr,es}.md` | Blog posts (Markdown with frontmatter) |
| `src/content/authors.ts` | Blog authors and reviewers (name, role, photo, bio, LinkedIn) |
| `public/images/` | Images (blog covers in `blog/`, author photos in `authors/`) |
| `src/actions/forms.ts` | Server code that receives and validates form submissions |
| `src/lib/supabase.ts` | Saves rows to Supabase |
| `supabase/schema.sql` | Database tables for the forms (run once in Supabase) |

## Editing content

- **Site text:** edit the matching key in `messages/en.json`, `fr.json` and `es.json`. Keep the three files' keys identical.
- **Blog posts:** each post is a folder in `src/content/blog/` with one Markdown file per language. Frontmatter fields:

  ```yaml
  title: "Post title"
  excerpt: "One-sentence summary (used for search engines)"
  date: "2025-10-02"            # shown as "Last Updated"
  readTime: "9 min read"
  image: "/images/blog/cover.jpg"
  author: "jane-doe"             # id from src/content/authors.ts
  reviewer: "john-smith"
  ```

  `##` headings become the post's Navigation list; the newsletter box appears in the sidebar when the reader reaches the last `##` section.
- **Authors:** add or edit entries in `src/content/authors.ts`, and put photos in `public/images/authors/`. The current two entries are placeholders.

---

## Forms and database


The site has two forms. Both are processed on the server, so the database key never reaches visitors' browsers.

| Form | Where it appears | Supabase table | Columns |
|---|---|---|---|
| Contact form | Contact page, homepage "get started" section | `contact_submissions` | `name`, `email`, `phone`, `subject`, `message`, `locale`, `page`, `created_at` |
| Newsletter | Blog posts (sidebar on desktop, after the article on mobile) | `newsletter_subscribers` | `email` (unique), `locale`, `page`, `created_at` |

`locale` is the site language the visitor used (`en`/`fr`/`es`) and `page` is the address they submitted from.

**What happens on submit:** fields are trimmed and length-checked and emails are lowercased before saving. A visitor who signs up to the newsletter twice is stored once. If saving fails, the form shows an error and keeps what the visitor typed so they can retry. A hidden field filters out most spam bots: their submissions look successful but are not stored.

### One-time setup

1. **Create a Supabase project.** Sign in at https://supabase.com → New project, with these settings:
   - **Project name:** `digital-seo-store` (only shown in your dashboard).
   - **Database password:** generate a strong one and save it in a password manager. The website doesn't use it.
   - **Region:** closest to where the website is hosted (Vercel's default is US East, so choose Americas/US East). It can't be changed later.
   - **Enable Data API:** on (the forms save through it).
   - **Automatically expose new tables:** off.
   - **Enable automatic RLS:** on.
   - **GitHub:** not needed.
2. **Create the tables.** In the project: SQL Editor → New query → paste the whole of [`supabase/schema.sql`](supabase/schema.sql) → Run. It should report success. Running it again is harmless.
3. **Copy the two values** the site needs:
   - **Project URL:** Project Settings → Data API → Project URL (looks like `https://abcdefgh.supabase.co`).
   - **Secret key:** Project Settings → API Keys → Secret keys → create or reveal one (starts with `sb_secret_`). If your project only shows the older "Legacy API keys" tab, the `service_role` key works too.

   Do **not** use the publishable/`anon` key. It cannot write to these tables, by design.
4. **Add them to the site.** Locally, in `.env.local`:

   ```bash
   SUPABASE_URL=https://abcdefgh.supabase.co
   SUPABASE_SECRET_KEY=sb_secret_...
   ```

   On a host, add the same two names as environment variables (see [Deployment](#deployment)).
5. **Test.** Restart the site, submit the contact form, then open Supabase → Table Editor → `contact_submissions`. Your test row should be there.

### Viewing and exporting submissions

Supabase → Table Editor → choose `contact_submissions` or `newsletter_subscribers`. Use the column headers to sort or filter, and Export → CSV to download (for example to import subscribers into an email tool).

To give a teammate access: Supabase → Organization settings → Team → Invite.

### Security notes

- The secret key has full access to the database. Keep it only in `.env.local` and the hosting dashboard. Never commit it, paste it into client code or give it a `NEXT_PUBLIC_` prefix. If it leaks, rotate it in Project Settings → API Keys and update the site.
- Row Level Security is on for both tables with no public policies. The public API can neither read nor write them; only the website's server can add rows.
- `.env.local` is git-ignored. `.env.example` (no real values) is committed as a template.

### Troubleshooting

Form errors are logged on the server with a `[forms]` prefix (Vercel: Project → Logs; other hosts: the Node.js app's log).

| Log message | Cause and fix |
|---|---|
| `Supabase is not configured` | `SUPABASE_URL` or `SUPABASE_SECRET_KEY` is missing on that environment. Add both, then redeploy or restart. |
| `rejected ... 401` | Wrong key, or the publishable key was used. Use the secret key. |
| `rejected ... 404` (relation does not exist) | The tables were not created. Run `supabase/schema.sql`. |
| `Could not reach Supabase` | Wrong URL, a network problem, or the project is paused. Free Supabase projects pause after a period of inactivity; restore it from the Supabase dashboard. |
| No `[forms]` line, but submitting fails behind a proxy/CDN | Next.js rejected the request's origin. Add your public domain to `serverActions.allowedOrigins` under `experimental` in `next.config.ts`. |

---

## Deployment

The site needs a host that **runs Node.js applications** (Node.js 20.9+). Static-only or basic shared hosting will not work: language routing, redirects, social share images and the forms all run on the server.

### Vercel

1. Import the GitHub repository at https://vercel.com/new (framework is detected automatically).
2. Project → Settings → Environment Variables: add `SUPABASE_URL` and `SUPABASE_SECRET_KEY` for Production (and Preview if you use it).
3. Deploy. After changing environment variables, redeploy for them to take effect.

### Other Node.js hosts (Hostinger, GoDaddy, a VPS, ...)

Check that your plan supports Node.js apps. Then, in the host's Node.js app settings:

| Setting | Value |
|---|---|
| Node.js version | 20.9 or newer (22 LTS recommended) |
| Install command | `npm install` |
| Build command | `npm run build` |
| Start command | `npm run start` (listens on `PORT` if the host sets it) |
| Environment variables | `SUPABASE_URL`, `SUPABASE_SECRET_KEY` |

If the host runs **several copies** of the site behind a load balancer, also set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` to the same random value on every copy (`.env.example` shows how to generate one). A single-server setup does not need it.

Point your domain at the host as their documentation describes, and enable HTTPS.

After each deploy, a visitor who had the page open from the previous version may get the form's error message once; reloading the page fixes it.
