import { Component, OnInit, HostListener, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Custom cursor -->
    <div class="cursor__dot"  [style.left.px]="cx()" [style.top.px]="cy()"></div>
    <div class="cursor__ring" [style.left.px]="cx()" [style.top.px]="cy()" [class.cursor--hover]="hovering()"></div>

    <!-- Navigation -->
    <nav class="nav" [class.nav--scrolled]="scrolled()">
      <div class="nav__inner container">
        <a routerLink="/" class="nav__logo">
          <span class="nav__logo-bracket">[</span>am<span class="nav__logo-bracket">]</span>
        </a>

        <button class="nav__burger" (click)="menuOpen.set(!menuOpen())" [class.open]="menuOpen()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav__links" [class.open]="menuOpen()">
          <li><a routerLink="/"         routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="menuOpen.set(false)">Home</a></li>
          <li><a routerLink="/projects" routerLinkActive="active" (click)="menuOpen.set(false)">Projects</a></li>
          <li><a routerLink="/blog"     routerLinkActive="active" (click)="menuOpen.set(false)">Blog</a></li>
          <li><a routerLink="/contact"  routerLinkActive="active" (click)="menuOpen.set(false)">Contact</a></li>
          <li><a href="https://github.com/abuzarmoradi" target="_blank" class="nav__github">GitHub ↗</a></li>
        </ul>
      </div>
    </nav>

    <!-- Page content -->
    <main>
      <router-outlet />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <span class="footer__copy">© 2025 Abuzar Moradi</span>
          <span class="footer__stack">Built with Quarkus · Angular · PostgreSQL</span>
          <div class="footer__links">
            <a href="https://github.com/abuzarmoradi" target="_blank">GitHub</a>
            <a href="https://linkedin.com/in/abuzarmoradi" target="_blank">LinkedIn</a>
            <a href="mailto:hello&#64;abuzarmoradi.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Nav */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 1.5rem 0;
      transition: background 0.3s, backdrop-filter 0.3s, padding 0.3s, box-shadow 0.3s;
    }
    .nav--scrolled {
      background: rgba(6,6,11,0.85);
      backdrop-filter: blur(20px);
      padding: 1rem 0;
      box-shadow: 0 1px 0 var(--c-border);
    }
    .nav__inner {
      display: flex; align-items: center; justify-content: space-between; gap: 2rem;
    }
    .nav__logo {
      font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
      letter-spacing: -0.04em; color: var(--c-text);
    }
    .nav__logo-bracket { color: var(--c-accent); }
    .nav__links {
      display: flex; align-items: center; gap: 2.5rem; list-style: none;
    }
    .nav__links a {
      font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.05em;
      color: var(--c-muted); transition: color 0.2s;
    }
    .nav__links a:hover, .nav__links a.active { color: var(--c-text); }
    .nav__github {
      color: var(--c-accent) !important;
      border: 1px solid var(--c-accent);
      padding: 0.35rem 0.85rem; border-radius: var(--radius);
      transition: background 0.2s !important;
    }
    .nav__github:hover { background: var(--c-accent) !important; color: #fff !important; }

    /* Burger */
    .nav__burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav__burger span { display: block; width: 24px; height: 2px; background: var(--c-text); transition: all 0.3s; border-radius: 2px; }
    .nav__burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav__burger.open span:nth-child(2) { opacity: 0; }
    .nav__burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    @media (max-width: 768px) {
      .nav__burger { display: flex; }
      .nav__links {
        position: fixed; inset: 0; top: 70px;
        flex-direction: column; justify-content: center; gap: 2rem;
        background: var(--c-bg);
        transform: translateX(100%); transition: transform 0.4s var(--ease-out-expo);
        font-size: 1.2rem;
      }
      .nav__links.open { transform: translateX(0); }
    }

    /* Footer */
    .footer { padding: 3rem 0; border-top: 1px solid var(--c-border); margin-top: 4rem; }
    .footer__inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
    .footer__copy { font-family: var(--font-mono); font-size: 0.78rem; color: var(--c-muted); }
    .footer__stack { font-family: var(--font-mono); font-size: 0.72rem; color: var(--c-muted); opacity: 0.5; }
    .footer__links { display: flex; gap: 1.5rem; }
    .footer__links a { font-family: var(--font-mono); font-size: 0.78rem; color: var(--c-muted); transition: color 0.2s; }
    .footer__links a:hover { color: var(--c-accent); }

    /* Cursor rings */
    .cursor__dot, .cursor__ring { pointer-events: none; position: fixed; z-index: 9999; }
    .cursor__dot { width: 8px; height: 8px; background: #fff; border-radius: 50%; transform: translate(-50%,-50%); transition: width .2s, height .2s; mix-blend-mode: difference; }
    .cursor__ring { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.4); border-radius: 50%; transform: translate(-50%,-50%); transition: left .08s linear, top .08s linear, width .3s, height .3s; mix-blend-mode: difference; }
    @media (hover: none) { .cursor__dot, .cursor__ring { display: none; } }
  `]
})
export class AppComponent implements OnInit {
  cx = signal(0);
  cy = signal(0);
  hovering = signal(false);
  scrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cx.set(e.clientX);
    this.cy.set(e.clientY);
    const el = e.target as HTMLElement;
    this.hovering.set(!!(el.closest('a') || el.closest('button') || el.closest('.btn')));
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  ngOnInit() {}
}
