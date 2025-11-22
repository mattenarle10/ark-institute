-- 1. Create the posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null unique,
  content text, -- Markdown content
  image_url text,
  published_at timestamp with time zone, -- If null, it's a draft. If set, it's published.
  is_published boolean generated always as (published_at is not null) stored
);

-- 2. Create a storage bucket for blog images
insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true);

-- 3. Enable RLS (Security)
alter table public.posts enable row level security;

-- 4. Policies

-- Public can view published posts
create policy "Public posts are viewable by everyone" 
  on public.posts for select 
  using (published_at is not null);

-- Admin (Authenticated users) can do everything
create policy "Admins can do everything" 
  on public.posts for all 
  using (auth.role() = 'authenticated');
  
-- Storage Policies
create policy "Images are publicly viewable"
  on storage.objects for select 
  using ( bucket_id = 'blog-images' );
  
create policy "Admins can upload images"
  on storage.objects for insert 
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

create policy "Admins can update images"
  on storage.objects for update
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

create policy "Admins can delete images"
  on storage.objects for delete
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );
