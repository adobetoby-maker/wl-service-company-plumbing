-- Page views tracking table
create table if not exists page_views (
  id bigserial primary key,
  path text not null,
  referrer text,
  ua text,
  created_at timestamptz default now()
);

create index on page_views (path);
create index on page_views (created_at);

-- Customer feedback table
create table if not exists feedback (
  id bigserial primary key,
  name text,
  email text,
  message text not null,
  rating int check (rating between 1 and 5),
  created_at timestamptz default now()
);

create index on feedback (created_at);
create index on feedback (rating);
