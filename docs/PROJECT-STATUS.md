# Digital SEO Store — Website Rebuild

Project documentation. Full formatted version: published as a Claude Artifact (ask in-session for the link if you don't have it, or check `/artifacts`).

Status: **Build complete, pre-launch.** 72 static pages (24 templates × EN/FR/ES), 0 build/TypeScript errors.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript** — fully static-rendered via `generateStaticParams`
- **next-intl** — `/en /fr /es` locale routing, translation loading, locale-aware navigation
- **Tailwind CSS v4** — CSS-first design tokens in `src/app/globals.css`
- **Framer Motion + Lenis** — scroll reveals, magnetic buttons, site-wide smooth scroll
- **react-markdown + gray-matter** — blog posts and Privacy Policy as Markdown with frontmatter (`src/content/blog/`, `src/content/legal/`)
- **GSAP + ScrollTrigger** — installed, wired to Lenis; not yet driving a dedicated pinned scroll sequence (see Improvements)

## Site map

**Core (8):** Home, About, Pricing, Contact, FAQ, Blog index, Privacy Policy, Thank You, plus 404.

**Services (12)**, consolidated from the old site's 13 (two SEO pages and two social pages were merged): SEO Services, Local SEO, eCommerce SEO, SEO Audit, PPC Advertising, Search Engine Marketing, Social Media Marketing, Content Marketing, Conversion Rate Optimization, Reputation Management, WordPress Development, Hire SEO Experts.

**Blog (3 posts):** Domain Authority tips, SEO content-writing rules, Google Merchant Center suspensions guide — all migrated and edited from legitimate original content.

The old site also had 74 orphaned Elementor demo templates left over from the stock theme; none of that carried over.

## Signature experience (design bar: "Apple engineers")

| Feature | Status |
|---|---|
| Site-wide Lenis smooth scroll | ✅ Shipped |
| Kinetic typography reveals | ✅ Shipped |
| Magnetic, cursor-aware CTAs | ✅ Shipped |
| Frosted-glass sticky nav | ✅ Shipped |
| Alternating light/dark sections | ✅ Shipped |
| Animated stat counters | ✅ Shipped |
| `prefers-reduced-motion` fallback | ✅ Shipped |
| GSAP pinned scroll-storytelling | ◐ Partial — homepage hero uses Framer Motion parallax; the originally-scoped pinned/morphing sequence isn't built |

## Content integrity fixes

The audit found live Lorem Ipsum placeholder text on real pages, and one core SEO page with copy lifted near-verbatim from WebFX/Thrive — including their $6B revenue figure, "500+ experts" headcount, and a reference to WebFX's proprietary "MarketingCloudFX" software. None of that belongs to Digital SEO Store.

Fixed:
- Every stat now traces to a real, verified fact (45+ experts, founded 2021, offices in US/Canada/India) and is used identically across every page
- Dropped "India's #1" framing in favor of global/US-led positioning matching the target markets (US, UK, Canada, Spain, France)
- De-duplicated repeated blocks (the old homepage repeated its comparison table and process section twice, verbatim)
- All 12 service pages written fresh against one shared fact sheet — no competitor-lifted claims anywhere

## What's remaining before launch

**Critical**
- [ ] Contact form backend — currently submits client-side to Thank You with no email/CRM delivery (needs Resend, SendGrid, or a webhook)
- [ ] Hosting & deployment — runs locally only; needs a host (Vercel is the path of least resistance), domain cutover, DNS/SSL

**Important**
- [ ] Native-speaker review of French & Spanish (especially Privacy Policy and any paid-ad copy)
- [ ] `sitemap.xml` / `robots.txt` — not generated yet
- [ ] Analytics & conversion tracking — no GA4/Plausible/pixel wired in
- [ ] Cookie consent banner — needed for real GDPR compliance once analytics/ads are added
- [ ] Terms of Service page — Privacy Policy exists, Terms doesn't

**Content & assets**
- [ ] Real photography — the entire site currently runs on typography/color/motion, zero photos anywhere
- [ ] Client logos / trust bar
- [ ] More blog posts / content calendar (3 exist today)
- [ ] Case studies with real before/after metrics (beyond the 3 existing text testimonials)

## Recommended improvements (not launch-blocking)

- Finish the GSAP pinned scroll-storytelling sequence — the highest-leverage motion work left
- Structured data (schema.org `Organization`/`Service`/`BlogPosting` JSON-LD)
- Per-page Open Graph images
- Full accessibility (WCAG) audit
- Lighthouse / Core Web Vitals pass (do after real photography is added)
- Lightweight CMS for the blog (currently hand-edited Markdown)
- Remove unused default Next.js starter SVGs still sitting in `/public`

## Out-of-the-box ideas for later

- **Free instant SEO audit tool** — live on-site scoring for a URL, doubles as a demo of the actual service + email capture
- **Interactive pricing/ROI calculator** — replaces static tiers with a personalized estimate
- **Programmatic country landing pages** — the old site had an "eCommerce SEO in Australia" page; worth deliberately replicating for UK/Spain/France with localized proof points
- **Video case studies** — replacing/supplementing text testimonials
- **Client portal / live dashboard** — turns "transparent reporting" from a claim into a product feature
- **"Which service do I need?" quiz** — routes undecided visitors, captures intent data
- **Live embedded rank tracker** — concrete, ongoing proof next to the transparency messaging
- **Partner/referral program page** — a second acquisition channel the current site doesn't address
- **AI content-brief generator** — free tool tied to the Content Marketing page, natural upsell
- **A single bold 3D/WebGL hero moment** — tied to the brand mark or a data motif, used sparingly

---
*Reflects the state of this repository as built. Update as scope changes.*
