-- ============================================================
-- abuzarmoradi.com — Initial Schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    tech_stack TEXT[], -- array of tech tags
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT false,
    reading_time_minutes INT DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100), -- e.g. "Backend", "Frontend", "DevOps"
    proficiency INT CHECK (proficiency BETWEEN 0 AND 100),
    icon_key VARCHAR(100),
    sort_order INT DEFAULT 0
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL,
    subject VARCHAR(300),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Seed Data
-- ============================================================

INSERT INTO skills (name, category, proficiency, icon_key, sort_order) VALUES
('Java',         'Backend',  95, 'java',       1),
('Quarkus',      'Backend',  90, 'quarkus',    2),
('Spring Boot',  'Backend',  85, 'spring',     3),
('PostgreSQL',   'Database', 88, 'postgres',   4),
('Redis',        'Database', 75, 'redis',      5),
('Angular',      'Frontend', 85, 'angular',    6),
('TypeScript',   'Frontend', 88, 'typescript', 7),
('Docker',       'DevOps',   82, 'docker',     8),
('Kubernetes',   'DevOps',   70, 'kubernetes', 9),
('Git',          'DevOps',   95, 'git',        10)
ON CONFLICT DO NOTHING;

INSERT INTO projects (title, slug, description, long_description, tech_stack, github_url, live_url, featured, sort_order) VALUES
(
  'Portfolio Platform',
  'portfolio-platform',
  'This very website — a full-stack personal portfolio with Quarkus, Angular, and PostgreSQL.',
  'A production-grade personal portfolio platform built from scratch. Features a Quarkus REST API with Panache ORM, an Angular 17 standalone frontend with signal-based state, and a PostgreSQL database. Deployed on Vercel and Railway.',
  ARRAY['Quarkus', 'Angular', 'PostgreSQL', 'Docker', 'TypeScript'],
  'https://github.com/abuzarmoradi/portfolio',
  'https://abuzarmoradi.com',
  true,
  1
),
(
  'Microservices Gateway',
  'microservices-gateway',
  'A high-performance API gateway built with Quarkus Reactive, handling 50k+ req/s with circuit breakers.',
  'Designed and implemented a reactive microservices gateway using Quarkus Mutiny, Vert.x, and Redis for caching. Includes circuit breaker patterns, rate limiting, JWT validation, and distributed tracing with OpenTelemetry.',
  ARRAY['Quarkus', 'Vert.x', 'Redis', 'OpenTelemetry', 'Kubernetes'],
  'https://github.com/abuzarmoradi/gateway',
  NULL,
  true,
  2
),
(
  'Real-Time Analytics Dashboard',
  'analytics-dashboard',
  'Live data dashboard with WebSocket streams, D3.js visualizations, and time-series PostgreSQL queries.',
  'Built a real-time analytics platform that ingests event streams via Kafka, processes them with Quarkus Reactive Messaging, stores aggregates in TimescaleDB, and streams results to an Angular frontend over WebSockets.',
  ARRAY['Quarkus', 'Kafka', 'TimescaleDB', 'Angular', 'D3.js'],
  'https://github.com/abuzarmoradi/analytics',
  NULL,
  true,
  3
)
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, tags, published, reading_time_minutes) VALUES
(
  'Why Quarkus Is My Go-To for Modern Java APIs',
  'why-quarkus-modern-java',
  'After years of Spring Boot, I switched to Quarkus — here''s why I''m not looking back.',
  '# Why Quarkus Is My Go-To for Modern Java APIs

After years of Spring Boot in production, I made the switch to Quarkus in 2023. The result? 80ms startup times, 50MB native binaries, and developer joy I hadn''t felt since my first day coding.

## The Dev Mode Experience

Quarkus''s `quarkus:dev` mode is something else. Live reload in under a second, the Dev UI for inspecting beans and configs, and the Continuous Testing runner — all built in.

## Native Compilation

GraalVM native images change the deployment game entirely. A Docker image under 100MB, cold starts measured in milliseconds, and memory footprints that make your ops team smile.

## Panache ORM

The active record pattern Panache brings to JPA is clean, readable, and surprisingly powerful for complex queries. Less boilerplate, more business logic.

The ecosystem is maturing fast. If you''re building new Java services in 2025, give Quarkus a serious look.',
  ARRAY['Java', 'Quarkus', 'Backend', 'Performance'],
  true,
  6
),
(
  'Signal-Based State in Angular 17 — A Deep Dive',
  'angular-signals-deep-dive',
  'Angular signals replace RxJS for most component state. Here''s how to think about the shift.',
  '# Signal-Based State in Angular 17

Angular''s signals API represents the biggest mental model shift in the framework since the introduction of standalone components. Here''s how I think about it after six months of production use.

## What Are Signals?

A signal is a reactive primitive that holds a value and notifies consumers when it changes. Unlike observables, signals are synchronous and always have a current value.

## computed() vs pipe()

The transition from RxJS operators to computed signals is surprisingly smooth. Most `map`, `filter`, and `combineLatest` patterns have clean signal equivalents.

## When To Still Use RxJS

HTTP calls, WebSocket streams, and complex async orchestration still belong in RxJS. The key insight is that signals handle **state** while observables handle **events**.',
  ARRAY['Angular', 'TypeScript', 'Frontend', 'Signals'],
  true,
  7
)
ON CONFLICT DO NOTHING;
