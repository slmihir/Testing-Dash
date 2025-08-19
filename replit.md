# Overview

This is a Playwright test reporting dashboard application built with React and Express. The application displays test results in a clean, modern interface similar to modern testing frameworks. It features a comprehensive dashboard showing test suite summaries, individual test results with detailed information including browser compatibility, performance metrics, and visual attachments. The application uses a full-stack TypeScript architecture with a React frontend and Express backend, currently using in-memory storage with plans for PostgreSQL integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider supporting light/dark modes with system preference detection

## Backend Architecture
- **Runtime**: Node.js with Express framework using TypeScript
- **API Structure**: RESTful endpoints serving JSON data for test suites and results
- **Storage**: Currently using in-memory storage with a clean interface pattern that allows easy migration to database persistence
- **Development**: Hot module replacement via Vite integration for seamless development experience

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema**: Structured tables for test results and test suites with support for complex data types (JSON for steps, attachments, performance metrics)
- **Database**: PostgreSQL (configured but not yet actively used, currently using in-memory storage)
- **Migrations**: Drizzle Kit for database schema management

## Component Architecture
- **Design System**: shadcn/ui components providing consistent UI patterns
- **Layout**: Responsive design with mobile-first approach
- **Features**: Advanced filtering, search functionality, expandable test details, and performance metrics visualization
- **Accessibility**: Built-in accessibility features through Radix UI primitives

## Development Tooling
- **Build System**: Vite with TypeScript compilation and hot reload
- **Code Quality**: ESLint configuration with TypeScript support
- **Styling**: PostCSS with Tailwind CSS processing
- **Development Server**: Express server with Vite middleware integration for unified development experience

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **express**: Web application framework for the backend API
- **react**: Frontend UI library with hooks and modern patterns
- **wouter**: Lightweight routing library for client-side navigation

## Database and ORM
- **drizzle-orm**: Type-safe ORM for database operations
- **@neondatabase/serverless**: PostgreSQL database driver optimized for serverless environments
- **drizzle-kit**: CLI tools for database migrations and schema management

## UI and Design System
- **@radix-ui/***: Headless UI primitives for accessibility and behavior
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Icon library with consistent design language

## Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking and enhanced developer experience
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting for Replit environment
- **esbuild**: JavaScript bundler for production builds