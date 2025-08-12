# Overview

This is a food delivery application called "Zuppr" built specifically for GITAM University students. The application allows students to browse restaurants, view menus, add items to cart, place orders, and track delivery status. It features a modern React frontend with server-side capabilities for handling orders and user management. The app includes authentication, real-time order tracking, and a complete e-commerce workflow tailored for campus food delivery. The app includes delivery fees (₹20) and platform fees (₹5) in the pricing structure.

**Status:** Ready for deployment - TypeScript build errors resolved and production build successful.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing with custom page navigation system
- **State Management**: Zustand with persistence for cart, user state, and application navigation
- **UI Components**: Comprehensive design system using Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming and brand colors (Grado orange, red, yellow)
- **Build System**: Vite with custom alias configuration for clean imports (@/, @shared, @assets)

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database ORM**: Drizzle ORM configured for PostgreSQL with migrations support
- **Storage Pattern**: Interface-based storage system with in-memory implementation for development and easy database swapping
- **API Structure**: RESTful API routes prefixed with /api for clear separation from frontend routes
- **Development Setup**: Hot module replacement and development middleware integrated with Vite

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM with schema-first approach
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage
- **Schema Management**: Type-safe database schemas using Drizzle with Zod validation
- **Migrations**: Automated database migrations through Drizzle Kit

## Authentication and Authorization
- **User Management**: Custom user system with username/password authentication
- **Session Storage**: Server-side session management with PostgreSQL backend
- **Type Safety**: Strongly typed user models with Zod schema validation
- **Storage Interface**: Abstracted user operations (getUser, getUserByUsername, createUser) for easy testing and swapping

## External Dependencies
- **Database Provider**: Neon Database serverless PostgreSQL (@neondatabase/serverless)
- **UI Component Library**: Radix UI primitives for accessible, unstyled components
- **Form Handling**: React Hook Form with Hookform resolvers for form validation
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Styling Utilities**: Class Variance Authority (CVA) for component variant management
- **Date Handling**: date-fns for date manipulation and formatting
- **Carousel Components**: Embla Carousel for image/content carousels
- **Development Tools**: Replit integration with cartographer and runtime error overlay plugins
- **Build Tools**: ESBuild for server bundling and TypeScript compilation