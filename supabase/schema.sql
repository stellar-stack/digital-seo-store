-- Digital SEO Store: form submission storage.
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement checks whether its object already exists.

-- Contact form (Contact page and the homepage "Get started" section).
create table if not exists public.contact_submissions (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  phone      text check (char_length(phone) <= 50),
  subject    text check (char_length(subject) <= 300),
  message    text check (char_length(message) <= 5000),
  locale     text check (char_length(locale) <= 10),
  page       text check (char_length(page) <= 300)
);

-- Newsletter box on blog posts. One row per address: the site stores emails
-- in lowercase and ignores repeat sign-ups.
create table if not exists public.newsletter_subscribers (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  email      text not null unique check (char_length(email) between 3 and 320),
  locale     text check (char_length(locale) <= 10),
  page       text check (char_length(page) <= 300)
);

-- Row Level Security on with no policies: the public (publishable/anon) key can
-- neither read nor write these tables. Only the website's server, using the
-- secret key, can insert rows. Team members read submissions in the dashboard.
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Explicit privileges, so this works whether or not the project was created
-- with "Automatically expose new tables". The public roles get nothing; the
-- server role (used by the secret key) may only add rows: it cannot read,
-- change or delete submissions through the API.
revoke all on table public.contact_submissions, public.newsletter_subscribers
  from anon, authenticated;
revoke all on table public.contact_submissions, public.newsletter_subscribers
  from service_role;
grant insert on table public.contact_submissions, public.newsletter_subscribers
  to service_role;
grant usage on sequence public.contact_submissions_id_seq, public.newsletter_subscribers_id_seq
  to service_role;

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);
