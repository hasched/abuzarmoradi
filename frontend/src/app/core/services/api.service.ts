import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // ADD THIS LINE

// ... interfaces remain the same ...

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;  // CHANGE THIS LINE

  getProjects(featured?: boolean): Observable<Project[]> {
    const url = featured ? `${this.base}/projects?featured=true` : `${this.base}/projects`;
    return this.http.get<Project[]>(url);
  }

  getProject(slug: string): Observable<Project> {
    return this.http.get<Project>(`${this.base}/projects/${slug}`);
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.base}/blog`);
  }

  getBlogPost(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.base}/blog/${slug}`);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.base}/skills`);
  }

  sendContact(req: ContactRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/contact`, req);
  }
}