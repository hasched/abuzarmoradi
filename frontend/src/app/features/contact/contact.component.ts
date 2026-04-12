import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="container">
        <p class="label">Let's Connect</p>
        <h1 class="page-title">Get in Touch</h1>
        <p class="page-sub">Have a project, an idea, or just want to chat? Drop me a message.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-grid">

          <!-- Left: info -->
          <div class="contact-info">
            <div class="contact-info__block">
              <p class="label">Email</p>
              <a href="mailto:hello@abuzarmoradi.com" class="contact-info__link">
                hello&#64;abuzarmoradi.com
              </a>
            </div>
            <div class="contact-info__block">
              <p class="label">Online</p>
              <a href="https://github.com/abuzarmoradi" target="_blank" class="contact-info__link">GitHub ↗</a>
              <a href="https://linkedin.com/in/abuzarmoradi" target="_blank" class="contact-info__link">LinkedIn ↗</a>
            </div>
            <div class="contact-info__block">
              <p class="label">Currently</p>
              <p class="contact-info__status">
                <span class="status-dot"></span>
                Open to opportunities
              </p>
            </div>
          </div>

          <!-- Right: form -->
          <div class="contact-form-wrap">
            @if (!sent()) {
              <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="contact-form" novalidate>
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Name *</label>
                    <input id="name" name="name" type="text" ngModel required
                           placeholder="Your name" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input id="email" name="email" type="email" ngModel required
                           placeholder="you@example.com" class="form-input" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input id="subject" name="subject" type="text" ngModel
                         placeholder="What's this about?" class="form-input" />
                </div>
                <div class="form-group">
                  <label for="message">Message *</label>
                  <textarea id="message" name="message" ngModel required rows="7"
                            placeholder="Tell me about your project or idea..." class="form-input"></textarea>
                </div>

                @if (error()) {
                  <p class="form-error">{{ error() }}</p>
                }

                <button type="submit" class="btn btn--primary" [disabled]="sending()">
                  {{ sending() ? 'Sending...' : 'Send Message →' }}
                </button>
              </form>
            } @else {
              <div class="contact-success">
                <div class="contact-success__icon">✓</div>
                <h2>Message received!</h2>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            }
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      padding: 10rem 0 4rem; border-bottom: 1px solid var(--c-border);
      background: radial-gradient(ellipse at 80% 50%, rgba(255,92,92,0.06) 0%, transparent 60%);
    }
    .page-title { font-size: clamp(2.5rem, 6vw, 5rem); margin: 0.5rem 0 1rem; }
    .page-sub { color: var(--c-muted); font-size: 1.1rem; max-width: 480px; }

    .contact-grid { display: grid; grid-template-columns: 320px 1fr; gap: 6rem; align-items: start; }
    @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }

    .contact-info { display: flex; flex-direction: column; gap: 2.5rem; }
    .contact-info__block { display: flex; flex-direction: column; gap: 0.75rem; }
    .contact-info__link { color: var(--c-text); font-size: 1rem; transition: color 0.2s; display: block; }
    .contact-info__link:hover { color: var(--c-accent); }
    .contact-info__status { display: flex; align-items: center; gap: 0.5rem; color: var(--c-text); }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c-accent2); box-shadow: 0 0 8px var(--c-accent2); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{box-shadow: 0 0 4px var(--c-accent2)} 50%{box-shadow: 0 0 14px var(--c-accent2)} }

    .contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-muted); }
    .form-input {
      background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius);
      color: var(--c-text); font-family: var(--font-body); font-size: 0.95rem; padding: 0.85rem 1rem;
      outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical; width: 100%;
    }
    .form-input::placeholder { color: var(--c-muted); opacity: 0.6; }
    .form-input:focus { border-color: var(--c-accent); box-shadow: 0 0 0 3px rgba(124,108,255,0.12); }
    .form-error { color: var(--c-accent3); font-family: var(--font-mono); font-size: 0.8rem; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }

    .contact-success {
      display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;
      padding: 3rem; border: 1px solid var(--c-accent2); border-radius: var(--radius-lg);
      background: rgba(0,229,192,0.04);
    }
    .contact-success__icon {
      width: 52px; height: 52px; border-radius: 50%;
      background: var(--c-accent2); color: #000;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; font-weight: 700;
    }
    .contact-success h2 { font-size: 1.75rem; }
    .contact-success p { color: var(--c-muted); }
  `]
})
export class ContactComponent {
  private api = inject(ApiService);
  sending = signal(false);
  sent = signal(false);
  error = signal('');

  onSubmit(form: NgForm) {
    if (form.invalid) { form.form.markAllAsTouched(); return; }
    this.sending.set(true);
    this.error.set('');
    const v = form.value;
    this.api.sendContact({ name: v.name, email: v.email, subject: v.subject || '', message: v.message })
      .subscribe({
        next: () => { this.sending.set(false); this.sent.set(true); },
        error: () => {
          this.sending.set(false);
          this.error.set('Something went wrong. Please email me directly.');
        }
      });
  }
}
