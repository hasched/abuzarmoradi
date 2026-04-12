# 🚀 abuzarmoradi.com — Full Setup Guide

## Project Tree

```
abuzarmoradi/
│
├── .gitignore
├── .vscode/
│   ├── launch.json          ← Debug configs (backend + frontend)
│   └── tasks.json           ← Run tasks from VS Code
├── abuzarmoradi.code-workspace
├── docker-compose.yml       ← Local dev: DB + all services
├── README.md
│
├── database/
│   └── migrations/
│       └── 001_init.sql     ← Schema + seed data
│
├── backend/                 ← Quarkus REST API (Java 21)
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/abuzar/
│       │   ├── dto/
│       │   │   └── ContactRequest.java
│       │   ├── model/
│       │   │   ├── BlogPost.java
│       │   │   ├── ContactMessage.java
│       │   │   ├── Project.java
│       │   │   └── Skill.java
│       │   └── resource/
│       │       ├── BlogResource.java
│       │       ├── ContactResource.java
│       │       ├── ProjectResource.java
│       │       └── SkillResource.java
│       └── resources/
│           ├── application.properties
│           └── db/migration/
│               └── V1__init.sql  ← Flyway auto-runs this on startup
│
└── frontend/                ← Angular 17 SPA
    ├── Dockerfile
    ├── angular.json
    ├── nginx.conf
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── vercel.json          ← Vercel deploy config
    └── src/
        ├── index.html
        ├── main.ts
        ├── styles.scss      ← Global design tokens + animations
        ├── proxy.conf.json  ← Dev: proxies /api → localhost:8080
        ├── environments/
        │   ├── environment.ts
        │   └── environment.prod.ts
        └── app/
            ├── app.component.ts   ← Root: nav + footer + custom cursor
            ├── app.config.ts      ← Providers (router, http, animations)
            ├── app.routes.ts      ← Lazy-loaded routes
            ├── core/
            │   └── services/
            │       └── api.service.ts  ← All HTTP calls to backend
            └── features/
                ├── home/
                │   └── home.component.ts    ← Hero, skills, featured projects
                ├── projects/
                │   └── projects.component.ts
                ├── blog/
                │   ├── blog.component.ts
                │   └── post/
                │       └── post.component.ts
                └── contact/
                    └── contact.component.ts
```

---

## Prerequisites — Install These First

| Tool | Version | Download |
|------|---------|---------|
| Java JDK | 21 | https://adoptium.net |
| Maven | 3.9+ | https://maven.apache.org (or use the included `./mvnw`) |
| Node.js | 20 LTS | https://nodejs.org |
| Angular CLI | 17+ | `npm install -g @angular/cli` |
| Docker Desktop | latest | https://docker.com/products/docker-desktop |
| Git | latest | https://git-scm.com |

---

## Step 1 — Open the Project in VS Code

1. Unzip `abuzarmoradi.zip` anywhere on your machine (e.g. `~/Projects/abuzarmoradi`)
2. Open VS Code
3. Go to **File → Open Workspace from File…**
4. Select `abuzarmoradi.code-workspace`
5. VS Code will prompt to install recommended extensions — click **Install All**

> The workspace opens three root folders: Root, Backend, Frontend — all in one sidebar.

---

## Step 2 — Set Up the Database

Open the VS Code integrated terminal (`Ctrl+`` ` ```) and run:

```bash
# From the project root
docker-compose up -d db
```

This starts PostgreSQL on `localhost:5432`. The database `abuzar_portfolio` is created automatically, and the schema + seed data runs from `database/migrations/001_init.sql`.

Verify it's running:
```bash
docker ps
# You should see: postgres:16-alpine  →  0.0.0.0:5432->5432/tcp
```

---

## Step 3 — Run the Backend (Quarkus)

Open a **new terminal tab** in VS Code:

```bash
cd backend
./mvnw quarkus:dev
```

On first run Maven downloads dependencies (~2 min). After that you'll see:

```
__  ____  __  _____   ___  __ ____  ______
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/
Listening on: http://localhost:8080
```

Flyway automatically runs `V1__init.sql` and seeds the database.

**Verify the API:**
- http://localhost:8080/api/projects  
- http://localhost:8080/api/blog  
- http://localhost:8080/api/skills  
- http://localhost:8080/api/swagger-ui  ← Interactive API docs
- http://localhost:8080/api/health

> Quarkus dev mode has **live reload** — edit any Java file and it recompiles instantly. No restart needed.

---

## Step 4 — Run the Frontend (Angular)

Open another **new terminal tab**:

```bash
cd frontend
npm install       # First time only — installs all packages
npx ng serve
```

After compilation:
```
✔ Browser application bundle generation complete.
Local:   http://localhost:4200/
```

Open http://localhost:4200 in your browser. The Angular dev server proxies all `/api/*` requests to the Quarkus backend automatically via `proxy.conf.json`.

---

## Step 5 — Push to GitHub

```bash
# From the project root
git init
git add .
git commit -m "feat: initial full-stack portfolio setup"

# Create a repo on github.com (name it: portfolio or abuzarmoradi.com)
git remote add origin https://github.com/abuzarmoradi/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 6 — Deploy the Backend

You need to host the Quarkus API somewhere with a public URL. Two free options:

### Option A: Railway (Recommended)
1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select your repo → select the `backend` folder as root
3. Add a PostgreSQL plugin — Railway auto-wires the `DATABASE_URL`
4. Set environment variables:
   ```
   DATABASE_URL=<auto-set by Railway>
   DATABASE_USER=<auto-set>
   DATABASE_PASSWORD=<auto-set>
   ```
5. Railway gives you a URL like: `https://portfolio-backend-production.up.railway.app`

### Option B: Render
1. Go to https://render.com → New Web Service → Connect GitHub
2. Root directory: `backend`
3. Build command: `./mvnw package -DskipTests`
4. Start command: `java -jar target/quarkus-app/quarkus-run.jar`
5. Add a PostgreSQL database and wire the env vars

---

## Step 7 — Configure Frontend for Production

Once you have your backend URL, update two files:

**`frontend/src/environments/environment.prod.ts`**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR_BACKEND_URL'  // ← paste your Railway/Render URL
};
```

**`frontend/vercel.json`**
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://YOUR_BACKEND_URL/api/$1" },
    { "source": "/(.*)",     "destination": "/index.html" }
  ]
}
```

Commit and push these changes:
```bash
git add .
git commit -m "config: set production backend URL"
git push
```

---

## Step 8 — Deploy Frontend to Vercel

1. Go to https://vercel.com → Add New Project → Import your GitHub repo
2. Set these options:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Other
   - **Build Command**: `npm run build:prod`
   - **Output Directory**: `dist/portfolio/browser`
3. Click **Deploy** — Vercel builds and deploys automatically
4. Go to **Project Settings → Domains**
5. Add `abuzarmoradi.com` and `www.abuzarmoradi.com`
6. Follow Vercel's instructions to update your DNS at your domain registrar:
   - Add an **A record**: `@` → `76.76.21.21`
   - Add a **CNAME record**: `www` → `cname.vercel-dns.com`

Wait 5-15 minutes for DNS to propagate. Then visit **https://abuzarmoradi.com** 🎉

---

## Step 9 — Also Update Backend CORS

Once your domain is live, update `backend/src/main/resources/application.properties`:

```properties
quarkus.http.cors.origins=https://abuzarmoradi.com,https://www.abuzarmoradi.com
```

Redeploy the backend.

---

## Day-to-Day Development Workflow

```bash
# Terminal 1 — DB
docker-compose up -d db

# Terminal 2 — Backend (live reload on save)
cd backend && ./mvnw quarkus:dev

# Terminal 3 — Frontend (hot reload on save)
cd frontend && npx ng serve
```

Edit any file, save it — changes appear instantly. No manual restarts.

---

## API Reference

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/projects` | All projects |
| GET | `/api/projects?featured=true` | Featured only |
| GET | `/api/projects/{slug}` | Single project |
| GET | `/api/blog` | Published posts |
| GET | `/api/blog/{slug}` | Single post |
| GET | `/api/skills` | All skills |
| POST | `/api/contact` | Send a message |
| GET | `/api/health` | Health check |
| GET | `/api/swagger-ui` | API docs UI |

---

## Customise Your Content

All your content lives in the database seed file:
`backend/src/main/resources/db/migration/V1__init.sql`

Edit the `INSERT` statements for:
- **skills** — add/remove technologies and proficiency levels
- **projects** — add your real projects
- **blog_posts** — write your articles

After editing, reset the DB locally:
```bash
docker-compose down -v   # wipe volumes
docker-compose up -d db  # recreate fresh with new seed
cd backend && ./mvnw quarkus:dev
```

---

## Common Issues & Fixes

**`./mvnw: Permission denied`**
```bash
chmod +x backend/mvnw
```

**Port 5432 already in use**
```bash
docker-compose down
sudo lsof -i :5432   # find what's using it
```

**Angular `ng: command not found`**
```bash
npm install -g @angular/cli
# or use: npx ng serve
```

**CORS errors in browser**  
Make sure your backend is running and `vercel.json` has the correct backend URL in the rewrite rule.

**Vercel build fails**  
Check that Root Directory is set to `frontend` in Vercel project settings.
