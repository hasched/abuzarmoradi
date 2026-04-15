import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  readingTimeMinutes: number;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  iconKey: string;
  sortOrder: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  // HARDCODE THE BACKEND URL DIRECTLY
  private base = 'https://abuzarmoradi-production.up.railway.app/api';

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