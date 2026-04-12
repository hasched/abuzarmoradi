# abuzarmoradi.com — Personal Portfolio

A full-stack personal portfolio website built with:
- **Backend**: Quarkus (Java) REST API
- **Frontend**: Angular 17+ with standalone components
- **Database**: PostgreSQL
- **Deploy**: Vercel (frontend) + Railway/Render (backend)

## Project Structure

```
abuzarmoradi/
├── backend/          # Quarkus REST API
├── frontend/         # Angular SPA
├── database/         # SQL migrations
└── docker-compose.yml
```

## Quick Start (Local Dev)

```bash
# 1. Start DB
docker-compose up -d db

# 2. Start backend
cd backend && ./mvnw quarkus:dev

# 3. Start frontend
cd frontend && npm install && ng serve
```

Frontend → http://localhost:4200  
Backend → http://localhost:8080  
# abuzarmoradi
