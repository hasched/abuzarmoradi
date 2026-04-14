import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, BlogPost } from '../../core/services/api.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div class="container">
        <p class="label">Writing</p>
        <h1 class="page-title">The Blog</h1>
        <p class="page-sub">Thoughts on engineering, architecture, and the craft of software.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (posts().length) {
          <div class="post-grid">
            @for (post of posts(); track post.id; let i = $index) {
              <a [routerLink]="['/blog', post.slug]" class="post-card" [class.post-card--hero]="i === 0">
                <div class="post-card__meta">
                  <span class="label">{{ formatDate(post.createdAt) }}</span>
                  <span class="post-card__read">{{ post.readingTimeMinutes }} min read</span>
                </div>
                <h2 class="post-card__title">{{ post.title }}</h2>
                <p class="post-card__excerpt">{{ post.excerpt }}</p>
                <div class="post-card__tags">
                  @for (tag of post.tags; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
                <span class="post-card__cta">Read article →</span>
              </a>
            }
          </div>
        } @else {
          <div class="post-grid">
            @for (s of [1,2]; track s) {
              <div class="skeleton-post"></div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      padding: 10rem 0 4rem; border-bottom: 1px solid var(--c-border);
      background: radial-gradient(ellipse at 30% 50%, rgba(0,229,192,0.06) 0%, transparent 60%);
    }
    .page-title { font-size: clamp(2.5rem, 6vw, 5rem); margin: 0.5rem 0 1rem; }
    .page-sub { color: var(--c-muted); font-size: 1.1rem; max-width: 480px; }

    .post-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5px; }
    .post-card {
      display: flex; flex-direction: column; gap: 1.25rem;
      padding: 2.5rem; background: var(--c-surface);
      transition: background 0.25s; text-decoration: none;
    }
    .post-card:hover { background: rgba(124,108,255,0.06); }
    .post-card--hero { grid-column: span 2; }
    .post-card--hero .post-card__title { font-size: clamp(1.5rem, 3vw, 2.5rem); }
    .post-card__meta { display: flex; justify-content: space-between; align-items: center; }
    .post-card__read { font-family: var(--font-mono); font-size: 0.72rem; color: var(--c-muted); }
    .post-card__title { font-size: 1.35rem; line-height: 1.3; }
    .post-card__excerpt { color: var(--c-muted); font-size: 0.95rem; flex: 1; }
    .post-card__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .post-card__cta { font-family: var(--font-mono); font-size: 0.78rem; color: var(--c-accent); margin-top: auto; }
    .skeleton-post { height: 300px; background: var(--c-surface); animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (max-width: 768px) { .post-grid { grid-template-columns: 1fr; } .post-card--hero { grid-column: span 1; } }
  `]
})
export class BlogComponent implements OnInit {
  private api = inject(ApiService);
  posts = signal<BlogPost[]>([]);
  ngOnInit() { this.api.getBlogPosts().subscribe(d => this.posts.set(d)); }
  formatDate(d: string) { return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
}
