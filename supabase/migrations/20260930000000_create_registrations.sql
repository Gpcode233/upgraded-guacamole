-- Event registrations. Rows are written only by the Next.js server using the
-- Supabase secret key; RLS is on with no policies, so the public anon key can
-- neither read nor write this table.

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (email = lower(email) and char_length(email) <= 254),
  phone text check (char_length(phone) <= 40),
  organisation text check (char_length(organisation) <= 160),
  event_slug text not null,
  membership_grade text not null,
  notes text check (char_length(notes) <= 2000),
  access_code text not null,
  email_sent_at timestamptz,
  checked_in_at timestamptz,

  constraint registrations_access_code_key unique (access_code),
  constraint registrations_email_event_key unique (email, event_slug)
);

create index if not exists registrations_event_slug_idx
  on public.registrations (event_slug);

alter table public.registrations enable row level security;
