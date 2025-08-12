# Zuppr - Food Delivery App

A modern food delivery application built for GITAM University students.

## Features

- Browse restaurant menus
- Add items to cart with quantity controls
- User authentication (Student ID + Google Sign-in)
- Order checkout with delivery details
- Real-time order tracking
- Review system for restaurants
- Search functionality

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: Zustand with persistence
- **Routing**: Wouter (client-side routing)

## Deployment Commands for Vercel

### Option 1: Deploy the entire project (includes both frontend and backend)
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy from root directory
vercel

# Follow the prompts:
# - What's your project name? zuppr
# - In which directory is your code located? ./
# - Want to modify these settings? N
```

### Option 2: Deploy frontend only (recommended for Vercel)
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Deploy from client directory
vercel

# Follow the prompts:
# - What's your project name? zuppr
# - In which directory is your code located? ./
# - Want to modify these settings? N
```

### Environment Setup

The app currently uses in-memory storage and doesn't require any environment variables for basic functionality.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and stores
│   │   └── hooks/       # Custom hooks
├── server/          # Express backend (development only)
└── shared/          # Shared types and schemas
```

## Pricing Structure

- Delivery Fee: ₹20 per order
- Platform Fee: ₹5 per order
- Food items: Variable pricing