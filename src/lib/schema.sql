-- GuelmaGuide AI — Supabase Schema
-- Run this in your Supabase SQL editor

-- Payments table: stores CCP receipt submissions
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  transaction_ref text not null,
  plan text not null check (plan in ('standard', 'pro')),
  receipt_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  notes text,
  created_at timestamptz default now()
);

-- Licenses table: stores generated license keys
create table if not exists licenses (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  plan text not null check (plan in ('standard', 'pro')),
  email text,
  is_used boolean default false,
  payment_id uuid references payments(id),
  created_at timestamptz default now(),
  activated_at timestamptz
);

-- Enable Row Level Security
alter table payments enable row level security;
alter table licenses enable row level security;

-- Policies: service role can do anything; anon can insert payments and read own license
create policy "anon can insert payments" on payments for insert to anon with check (true);
create policy "anon can validate license" on licenses for select to anon using (true);
create policy "anon can update license" on licenses for update to anon using (true);
