# BSERC Next.js Frontend

This project is the Next.js App Router frontend for BSERC. It includes a public site, admin dashboard routes, authentication flows, and server-side API proxies to the backend service.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. Install dependencies:
	npm install
2. Create environment variables in .env.local:
	API_URL=http://127.0.0.1:5000
3. Start development server:
	npm run dev

## Scripts

- npm run dev: Start local development server
- npm run build: Create production build
- npm run start: Run production server
- npm run lint: Run ESLint checks
- npm run type-check: Run TypeScript checks

## Main Routes

- Student login: /login
- Student register: /register
- Admin login: /admin/login
- Admin dashboard: /admin

Legacy auth routes are permanently redirected to the canonical routes for compatibility:

- /auth/student/login
- /auth/student/register
- /auth/admin-login/login

## API Proxy Routes

- POST /api/auth/login
- POST /api/auth/register
- POST /api/workshop-list/create

All proxy routes forward requests to API_URL with local fallback hosts for development.


//testing