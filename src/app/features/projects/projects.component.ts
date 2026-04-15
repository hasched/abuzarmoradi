import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Project } from '../../core/services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="container">
        <p class="label">Portfolio</p>
        <h1 class="page-title">All Projects</h1>
        <p class="page-sub">A selection of things I've built — from APIs to full products.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (projects().length) {
          <div class="project-list">
            @for (project of projects(); track project.id; let i = $index) {
              <article class="proj-row">
                <span class="proj-row__num">{{ ('0' + (i + 1)).slice(-2) }}</span>
                <div class="proj-row__body">
                  <div class="proj-row__top">
                    <h2 class="proj-row__title">{{ project.title }}</h2>
                    <div class="proj-row__tags">
                      @for (t of project.techStack; track t) {
                        <span class="tag">{{ t }}</span>
                      }
                    </div>
                  </div>
                  <p class="proj-row__desc">{{ project.longDescription || project.description }}</p>
                  <div class="proj-row__links">
                    @if (project.githubUrl) {
                      <a [href]="project.githubUrl" target="_blank" class="proj-link">GitHub ↗</a>
                    }
                    @if (project.liveUrl) {
                      <a [href]="project.liveUrl" target="_blank" class="proj-link proj-link--accent">Live Demo ↗</a>
                    }
                  </div>
                </div>
                @if (project.featured) {
                  <span class="proj-row__badge">Featured</span>
                }
              </article>
            }
          </div>
        } @else {
          <div class="skeletons">
            @for (s of [1,2,3]; track s) {
              <div class="skeleton-row"></div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      padding: 10rem 0 4rem; border-bottom: 1px solid var(--c-border);
      background: radial-gradient(ellipse at 60% 50%, rgba(124,108,255,0.07) 0%, transparent 60%);
    }
    .page-title { font-size: clamp(2.5rem, 6vw, 5rem); margin: 0.5rem 0 1rem; }
    .page-sub { color: var(--c-muted); font-size: 1.1rem; max-width: 480px; }
    .project-list { display: flex; flex-direction: column; }
    .proj-row {
      position: relative; display: grid; grid-template-columns: 60px 1fr auto;
      gap: 2rem; align-items: start; padding: 2.5rem 0;
      border-bottom: 1px solid var(--c-border);
      transition: background 0.2s; border-radius: var(--radius);
    }
    .proj-row:hover { background: rgba(255,255,255,0.02); padding-left: 1rem; padding-right: 1rem; }
    .proj-row__num { font-family: var(--font-mono); font-size: 0.72rem; color: var(--c-accent); padding-top: 0.5rem; }
    .proj-row__top { display: flex; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
    .proj-row__title { font-size: 1.5rem; }
    .proj-row__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.25rem; }
    .proj-row__desc { color: var(--c-muted); font-size: 0.95rem; max-width: 680px; margin-bottom: 1.25rem; line-height: 1.8; }
    .proj-row__links { display: flex; gap: 1.25rem; }
    .proj-link { font-family: var(--font-mono); font-size: 0.8rem; color: var(--c-muted); transition: color 0.2s; }
    .proj-link:hover { color: var(--c-text); }
    .proj-link--accent { color: var(--c-accent); }
    .proj-row__badge {
      font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
      padding: 0.25rem 0.6rem; border: 1px solid var(--c-accent); color: var(--c-accent); border-radius: var(--radius);
      align-self: center; white-space: nowrap;
    }
    .skeletons { display: flex; flex-direction: column; gap: 1px; }
    .skeleton-row { height: 160px; background: var(--c-surface); animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (max-width: 768px) { .proj-row { grid-template-columns: 40px 1fr; } .proj-row__badge { display: none; } }
  `]
})
export class ProjectsComponent implements OnInit {
  private api = inject(ApiService);
  projects = signal<Project[]>([]);
  ngOnInit() { this.api.getProjects().subscribe(d => this.projects.set(d)); }
}
