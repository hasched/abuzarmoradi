import { Component, OnInit, inject, signal, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, Project, Skill } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- ===================== HERO ===================== -->
    <section class="hero">
      <div class="hero__bg-grid"></div>
      <div class="hero__glow hero__glow--1"></div>
      <div class="hero__glow hero__glow--2"></div>

      <div class="container hero__content">
        <div class="hero__eyebrow label">
          <span class="hero__dot"></span>Available for projects
        </div>

        <h1 class="hero__title">
          <span class="hero__title-line">Building things</span>
          <span class="hero__title-line hero__title-line--accent">that matter.</span>
        </h1>

        <p class="hero__sub">
          Full-Stack Software Engineer. I craft high-performance backends with
          <em>Quarkus</em>, reactive frontends with <em>Angular</em>, and
          scalable data models with <em>PostgreSQL</em>.
        </p>

        <div class="hero__ctas">
          <a routerLink="/projects" class="btn btn--primary">View Projects</a>
          <a routerLink="/contact"  class="btn btn--ghost">Let's Talk ↗</a>
        </div>

        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-num">5+</span>
            <span class="hero__stat-label">Years Engineering</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-num">30+</span>
            <span class="hero__stat-label">Projects Shipped</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-num">∞</span>
            <span class="hero__stat-label">Coffee Consumed</span>
          </div>
        </div>
      </div>

      <div class="hero__scroll">
        <span>scroll</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>

    <!-- ===================== ABOUT ===================== -->
    <section class="section about">
      <div class="container">
        <div class="about__grid">
          <div class="about__left">
            <p class="label">About Me</p>
            <h2 class="about__heading">Engineer by craft.<br>Designer by taste.</h2>
          </div>
          <div class="about__right">
            <p>
              I'm Abuzar — a software engineer who obsesses over the full stack.
              From architecting reactive microservices in <strong>Quarkus</strong> to
              sculpting pixel-perfect UIs in <strong>Angular</strong>, I care about
              every layer of the system.
            </p>
            <p>
              I believe great software is fast, readable, and honest. I've built
              APIs that handle tens of thousands of requests per second, dashboards
              that surface real-time insights, and systems that engineers actually
              enjoy working in.
            </p>
            <p>
              When I'm not coding, I'm reading about distributed systems, tinkering
              with hardware, or trying to make the perfect espresso.
            </p>
            <div class="about__links">
              <a href="/assets/cv.pdf" target="_blank" class="btn btn--ghost">Download CV ↓</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SKILLS ===================== -->
    <section class="section skills-section">
      <div class="container">
        <p class="label">Tech Stack</p>
        <h2 class="section-title">What I work with</h2>

        @if (skillsByCategory() | keyvalue; as cats) {
          <div class="skills__categories">
            @for (cat of cats; track cat.key) {
              <div class="skills__category">
                <h3 class="skills__cat-name">{{ cat.key }}</h3>
                <div class="skills__list">
                  @for (skill of cat.value; track skill.id) {
                    <div class="skill-card">
                      <div class="skill-card__header">
                        <span class="skill-card__name">{{ skill.name }}</span>
                        <span class="skill-card__pct">{{ skill.proficiency }}%</span>
                      </div>
                      <div class="skill-card__bar">
                        <div class="skill-card__fill" [style.width.%]="skill.proficiency"></div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>

    <!-- ===================== FEATURED PROJECTS ===================== -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="label">Portfolio</p>
            <h2 class="section-title">Featured Work</h2>
          </div>
          <a routerLink="/projects" class="btn btn--ghost">All Projects →</a>
        </div>

        @if (projects().length) {
          <div class="projects-grid">
            @for (project of projects(); track project.id; let i = $index) {
              <article class="project-card" [class.project-card--wide]="i === 0">
                <div class="project-card__num">{{ ('0' + (i + 1)).slice(-2) }}</div>
                <div class="project-card__body">
                  <h3 class="project-card__title">{{ project.title }}</h3>
                  <p class="project-card__desc">{{ project.description }}</p>
                  <div class="project-card__tags">
                    @for (tech of project.techStack; track tech) {
                      <span class="tag">{{ tech }}</span>
                    }
                  </div>
                </div>
                <div class="project-card__actions">
                  @if (project.githubUrl) {
                    <a [href]="project.githubUrl" target="_blank" class="project-card__link">GitHub ↗</a>
                  }
                  @if (project.liveUrl) {
                    <a [href]="project.liveUrl" target="_blank" class="project-card__link project-card__link--accent">Live ↗</a>
                  }
                </div>
                <div class="project-card__glow"></div>
              </article>
            }
          </div>
        } @else {
          <div class="loading-grid">
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
          </div>
        }
      </div>
    </section>

    <!-- ===================== CTA ===================== -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-box">
          <div class="cta-box__glow"></div>
          <p class="label">Let's build something</p>
          <h2 class="cta-box__title">Have a project in mind?</h2>
          <p class="cta-box__sub">I'm always open to interesting engineering challenges, collaborations, and conversations.</p>
          <a routerLink="/contact" class="btn btn--primary">Get in Touch →</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero */
    .hero {
      position: relative; min-height: 100vh; display: flex; align-items: center;
      overflow: hidden; padding: 8rem 0 4rem;
    }
    .hero__bg-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(124,108,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124,108,255,0.04) 1px, transparent 1px);
      background-size: 80px 80px;
    }
    .hero__glow {
      position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
    }
    .hero__glow--1 {
      width: 600px; height: 600px; top: -200px; left: -200px;
      background: radial-gradient(circle, rgba(124,108,255,0.18) 0%, transparent 70%);
    }
    .hero__glow--2 {
      width: 400px; height: 400px; bottom: -100px; right: 10%;
      background: radial-gradient(circle, rgba(0,229,192,0.12) 0%, transparent 70%);
    }
    .hero__content { position: relative; z-index: 1; max-width: 800px; }
    .hero__eyebrow {
      display: flex; align-items: center; gap: 0.6rem; margin-bottom: 2rem;
      animation: fadeIn 0.6s ease both;
    }
    .hero__dot {
      width: 8px; height: 8px; border-radius: 50%; background: var(--c-accent2);
      box-shadow: 0 0 10px var(--c-accent2);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 6px var(--c-accent2); }
      50%      { box-shadow: 0 0 20px var(--c-accent2); }
    }
    .hero__title {
      font-size: clamp(3.5rem, 9vw, 7.5rem); margin-bottom: 1.5rem;
      display: flex; flex-direction: column;
    }
    .hero__title-line {
      display: block; overflow: hidden;
      animation: fadeUp 0.8s var(--ease-out-expo) both;
    }
    .hero__title-line:nth-child(1) { animation-delay: 0.1s; }
    .hero__title-line:nth-child(2) { animation-delay: 0.22s; }
    .hero__title-line--accent { color: var(--c-accent); }
    .hero__sub {
      font-size: 1.15rem; color: var(--c-muted); max-width: 540px; margin-bottom: 2.5rem;
      animation: fadeUp 0.8s var(--ease-out-expo) 0.35s both;
    }
    .hero__sub em { font-style: normal; color: var(--c-text); }
    .hero__ctas {
      display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem;
      animation: fadeUp 0.8s var(--ease-out-expo) 0.45s both;
    }
    .hero__stats {
      display: flex; gap: 3rem; flex-wrap: wrap;
      animation: fadeUp 0.8s var(--ease-out-expo) 0.55s both;
    }
    .hero__stat { display: flex; flex-direction: column; gap: 0.15rem; }
    .hero__stat-num { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--c-text); }
    .hero__stat-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--c-muted); letter-spacing: 0.08em; text-transform: uppercase; }
    .hero__scroll {
      position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
      font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--c-muted);
      animation: fadeIn 1s 1s both;
    }
    .hero__scroll-line {
      width: 1px; height: 50px;
      background: linear-gradient(to bottom, var(--c-muted), transparent);
      animation: scrollLine 1.5s infinite;
    }
    @keyframes scrollLine {
      0%   { transform: scaleY(0); transform-origin: top; }
      50%  { transform: scaleY(1); transform-origin: top; }
      51%  { transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }

    /* About */
    .about__grid {
      display: grid; grid-template-columns: 1fr 1.4fr; gap: 6rem; align-items: start;
    }
    .about__heading {
      font-size: clamp(2rem, 4vw, 3rem); margin-top: 1.5rem; margin-bottom: 0;
    }
    .about__right p { color: var(--c-muted); margin-bottom: 1.25rem; font-size: 1.05rem; }
    .about__right strong { color: var(--c-text); font-weight: 500; }
    .about__links { margin-top: 2rem; }
    @media (max-width: 900px) { .about__grid { grid-template-columns: 1fr; gap: 2rem; } }

    /* Section common */
    .section-title { font-size: clamp(2rem, 4vw, 2.8rem); margin: 0.75rem 0 3rem; }
    .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
    .section-header .section-title { margin-bottom: 0; }

    /* Skills */
    .skills__categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 3rem; }
    .skills__cat-name { font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-accent2); margin-bottom: 1.5rem; }
    .skills__list { display: flex; flex-direction: column; gap: 1rem; }
    .skill-card__header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
    .skill-card__name { font-size: 0.9rem; color: var(--c-text); }
    .skill-card__pct { font-family: var(--font-mono); font-size: 0.75rem; color: var(--c-muted); }
    .skill-card__bar { height: 3px; background: var(--c-border); border-radius: 2px; overflow: hidden; }
    .skill-card__fill {
      height: 100%; border-radius: 2px;
      background: linear-gradient(90deg, var(--c-accent), var(--c-accent2));
      transition: width 1s var(--ease-out-expo);
    }

    /* Projects */
    .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; }
    .project-card {
      position: relative; padding: 2.5rem; background: var(--c-surface);
      overflow: hidden; transition: background 0.3s;
      display: flex; flex-direction: column; gap: 1.5rem;
    }
    .project-card--wide { grid-column: span 2; }
    .project-card:hover { background: rgba(124,108,255,0.06); }
    .project-card:hover .project-card__glow { opacity: 1; }
    .project-card__glow {
      position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.4s;
      background: radial-gradient(circle at 30% 30%, rgba(124,108,255,0.08) 0%, transparent 60%);
    }
    .project-card__num { font-family: var(--font-mono); font-size: 0.7rem; color: var(--c-accent); letter-spacing: 0.1em; }
    .project-card__title { font-size: 1.3rem; margin-bottom: 0.5rem; }
    .project-card__desc { color: var(--c-muted); font-size: 0.95rem; flex: 1; }
    .project-card__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .project-card__actions { display: flex; gap: 1rem; margin-top: auto; }
    .project-card__link { font-family: var(--font-mono); font-size: 0.78rem; color: var(--c-muted); transition: color 0.2s; }
    .project-card__link:hover { color: var(--c-text); }
    .project-card__link--accent { color: var(--c-accent); }
    @media (max-width: 900px) {
      .projects-grid { grid-template-columns: 1fr; }
      .project-card--wide { grid-column: span 1; }
    }

    /* Skeleton */
    .loading-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; }
    .skeleton { height: 280px; background: var(--c-surface); animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

    /* CTA */
    .cta-box {
      position: relative; text-align: center; padding: 6rem 2rem;
      border: 1px solid var(--c-border); border-radius: var(--radius-lg); overflow: hidden;
    }
    .cta-box__glow {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse at 50% 100%, rgba(124,108,255,0.12) 0%, transparent 60%);
    }
    .cta-box__title { font-size: clamp(2rem, 5vw, 3.5rem); margin: 1rem 0; }
    .cta-box__sub { color: var(--c-muted); max-width: 480px; margin: 0 auto 2.5rem; }
  `]
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  projects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  skillsByCategory = signal<Record<string, Skill[]>>({});

  ngOnInit() {
    this.api.getProjects(true).subscribe(data => this.projects.set(data));
    this.api.getSkills().subscribe(data => {
      this.skills.set(data);
      const grouped = data.reduce((acc, s) => {
        (acc[s.category] ??= []).push(s);
        return acc;
      }, {} as Record<string, Skill[]>);
      this.skillsByCategory.set(grouped);
    });
  }
}
