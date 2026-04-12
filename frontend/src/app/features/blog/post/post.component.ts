import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, BlogPost } from '../../../core/services/api.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (post()) {
      <div class="post-hero">
        <div class="container">
          <a routerLink="/blog" class="back-link">← All Posts</a>
          <div class="post-hero__meta">
            <span class="label">{{ formatDate(post()!.createdAt) }}</span>
            <span class="post-hero__read">{{ post()!.readingTimeMinutes }} min read</span>
          </div>
          <h1 class="post-hero__title">{{ post()!.title }}</h1>
          <p class="post-hero__excerpt">{{ post()!.excerpt }}</p>
          <div class="post-hero__tags">
            @for (tag of post()!.tags; track tag) {
              <span class="tag">{{ tag }}</span>
            }
          </div>
        </div>
      </div>
      <article class="post-body">
        <div class="container">
          <div class="post-content" [innerHTML]="renderedContent()"></div>
        </div>
      </article>
    } @else if (loading()) {
      <div class="post-loading container">
        <div class="skeleton-title"></div>
        <div class="skeleton-body"></div>
      </div>
    }
  `,
  styles: [`
    .post-hero {
      padding: 10rem 0 4rem; border-bottom: 1px solid var(--c-border);
      background: radial-gradient(ellipse at 50% 100%, rgba(124,108,255,0.08) 0%, transparent 60%);
    }
    .back-link { font-family: var(--font-mono); font-size: 0.8rem; color: var(--c-muted); display: inline-block; margin-bottom: 2rem; transition: color 0.2s; }
    .back-link:hover { color: var(--c-accent); }
    .post-hero__meta { display: flex; gap: 2rem; align-items: center; margin-bottom: 1.5rem; }
    .post-hero__read { font-family: var(--font-mono); font-size: 0.72rem; color: var(--c-muted); }
    .post-hero__title { font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 1.25rem; max-width: 760px; }
    .post-hero__excerpt { color: var(--c-muted); font-size: 1.1rem; max-width: 620px; margin-bottom: 1.5rem; }
    .post-hero__tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .post-body { padding: 5rem 0 8rem; }
    .post-content {
      max-width: 720px; color: var(--c-muted); font-size: 1.05rem; line-height: 1.85;
    }
    .post-content :global(h1), .post-content :global(h2), .post-content :global(h3) {
      font-family: var(--font-display); color: var(--c-text); margin: 2.5rem 0 1rem;
    }
    .post-content :global(p) { margin-bottom: 1.5rem; }
    .post-content :global(strong) { color: var(--c-text); font-weight: 500; }
    .post-content :global(code) {
      font-family: var(--font-mono); font-size: 0.85em; background: var(--c-surface);
      padding: 0.15em 0.4em; border-radius: 3px; color: var(--c-accent2);
    }

    .post-loading { padding: 10rem 0; }
    .skeleton-title { height: 80px; background: var(--c-surface); border-radius: 4px; margin-bottom: 2rem; max-width: 600px; animation: shimmer 1.5s infinite; }
    .skeleton-body { height: 400px; background: var(--c-surface); border-radius: 4px; animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%,100%{opacity:.5} 50%{opacity:1} }
  `]
})
export class PostComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  post = signal<BlogPost | null>(null);
  loading = signal(true);
  renderedContent = signal('');

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.getBlogPost(slug).subscribe({
      next: p => {
        this.post.set(p);
        this.loading.set(false);
        // Simple Markdown-to-HTML (no external deps)
        this.renderedContent.set(this.parseMarkdown(p.content || ''));
      },
      error: () => this.loading.set(false)
    });
  }

  formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  private parseMarkdown(md: string): string {
    return md
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|p])(.+)$/gm, '<p>$1</p>');
  }
}
