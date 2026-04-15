import { Component, OnInit, inject, signal } from '@angular/core';
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
        <h1 class="hero__title">
          <span class="hero__title-line">Building things</span>
          <span class="hero__title-line hero__title-line--accent">that matter.</span>
        </h1>

        <p class="hero__sub">
          Software Developer with a strong focus on Java backend development using
          <em>Quarkus</em>, building modern and responsive frontends with <em>Angular</em> and
          <em>React</em>, and working with enterprise-grade databases and CI/CD pipelines
          to deliver scalable, production-ready applications.
        </p>

        <div class="hero__ctas">
          <a routerLink="/contact" class="btn btn--ghost">Let's Talk ↗</a>
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
            <h2 class="about__heading">Software developer.<br>Problem solver. Traveler.</h2>
          </div>
          <div class="about__right">
            <p>
              I'm Abuzar — a software developer with a B.Sc. in Computer Science from 
              Hochschule Coburg and hands-on experience building backend services with 
              <strong>Java</strong> and <strong>Quarkus</strong> at HUK-Coburg. I also work with 
              <strong>Angular</strong> and <strong>React</strong> for frontend components, and I'm 
              comfortable with the full development cycle — from requirements to deployment on 
              JBoss servers and <strong>OpenShift</strong>.
            </p>
            <p>
              I value clean, maintainable code and pragmatic solutions. I've worked with 
              CI/CD pipelines using Jenkins and GitLab, done code reviews and documentation in Confluence, 
              and collaborated in Scrum teams. Before my current role, I gained experience 
              in Python test automation through internship at TraceTronic and IT support at KPMG in Munich.
            </p>
            <p>
              When I'm not coding, I enjoy traveling the world, collecting artworks, and going to the gym. 
              I speak German, English, Farsi fluently, and basic French.
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

        @if (skillsByCategory() && getCategoryKeys().length > 0) {
          <div class="skills__categories">
            @for (category of getCategoryKeys(); track category) {
              <div class="skills__category">
                <h3 class="skills__cat-name">{{ category }}</h3>
                <div class="skills__list">
                  @for (skill of skillsByCategory()[category]; track skill.id) {
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
        } @else {
          <div class="loading-grid">
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
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
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

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

    .section-title { font-size: clamp(2rem, 4vw, 2.8rem); margin: 0.75rem 0 3rem; }

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

    .loading-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; }
    .skeleton { height: 280px; background: var(--c-surface); animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 1.5rem; border-radius: 40px;
      font-weight: 500; transition: all 0.2s; cursor: pointer;
      text-decoration: none;
    }
    .btn--ghost {
      background: transparent; border: 1px solid var(--c-border); color: var(--c-text);
    }
    .btn--ghost:hover {
      border-color: var(--c-accent); background: rgba(124,108,255,0.1);
    }
    .label {
      font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--c-accent2);
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
    .section { padding: 6rem 0; }
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
        if (!acc[s.category]) acc[s.category] = [];
        acc[s.category].push(s);
        return acc;
      }, {} as Record<string, Skill[]>);
      this.skillsByCategory.set(grouped);
    });
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.skillsByCategory());
  }
}