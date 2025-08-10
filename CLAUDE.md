# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle schema
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes directly to database
- `npm run db:studio` - Open Drizzle Studio for database management

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with JWT plugin
- **UI Components**: Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Directory Structure

- `app/` - Next.js App Router pages and API routes
  - `api/v1/auth/[...all]/route.ts` - Better Auth catch-all route
  - `chat/page.tsx` - Main chat interface
  - `login/` & `signup/` - Authentication pages
- `components/` - Reusable UI components
  - `ui/` - shadcn/ui components
  - `chat.tsx` - Main chat component with sidebar layout
- `db/` - Database configuration and schema
  - `auth-schema.ts` - User, session, account tables for Better Auth
  - `drizzle.config.ts` - Database connection config
  - `migrations/` - Drizzle migration files
- `lib/` - Utility libraries
  - `auth.ts` - Better Auth configuration
  - `auth-client.ts` - Client-side auth utilities

### Authentication Architecture
Uses Better Auth with Drizzle adapter for PostgreSQL. Auth endpoints are under `/api/v1/auth/` with email/password authentication enabled and JWT plugin for token management.

### Database Schema
- `user` - User accounts with email verification
- `session` - User sessions with IP/User Agent tracking
- `account` - OAuth and password authentication data
- `verification` - Email verification tokens
- `jwks` - JWT signing keys

### UI Architecture
- Dark theme chat interface with three-panel layout (navigation, conversations, chat + members)
- Uses shadcn/ui components built on Radix UI primitives
- Responsive design with Tailwind CSS
- CSS custom properties for consistent theming across components

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (defaults to `postgresql://localhost:5432/app`)

## Development Notes

- TypeScript and ESLint errors are ignored during builds (configured in next.config.mjs)
- Image optimization is disabled for development convenience
- Uses pnpm as package manager (based on pnpm-lock.yaml presence)