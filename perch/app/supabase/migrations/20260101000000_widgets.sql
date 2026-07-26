-- Perch: saved widget configs. One row = one embeddable voice widget, owned by a user.
create table if not exists public.widgets (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null default 'Untitled',
  agent_id   text not null default '',
  accent     text not null default '#6D5EF6',
  position   text not null default 'bottom-right' check (position in ('bottom-right','bottom-left')),
  title      text not null default 'Ask us anything',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Owner-only access. RLS is the real security gate; the client only ever holds the anon key + a user JWT.
alter table public.widgets enable row level security;

create policy "widgets_select_own" on public.widgets for select using (auth.uid() = user_id);
create policy "widgets_insert_own" on public.widgets for insert with check (auth.uid() = user_id);
create policy "widgets_update_own" on public.widgets for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "widgets_delete_own" on public.widgets for delete using (auth.uid() = user_id);

-- keep updated_at fresh
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists widgets_touch on public.widgets;
create trigger widgets_touch before update on public.widgets
  for each row execute function public.touch_updated_at();
