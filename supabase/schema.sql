create table public.posts (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  content text not null,
  published_at timestamp with time zone null,
  created_at timestamp with time zone not null default now(),
  cover_image_url text null,
  constraint posts_pkey primary key (id),
  constraint posts_slug_key unique (slug)
) TABLESPACE pg_default;