# VendorSoluce Application

Full-stack React application for vendor risk management, deployed to `application.vendorsoluce.com`.

## Overview

This is the main VendorSoluce platform application providing:
- Vendor risk assessment
- SBOM analysis
- NIST compliance tracking
- Vendor management dashboard
- User authentication and authorization
- Subscription management

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Payments**: Stripe
- **State**: Zustand
- **Routing**: React Router
- **Testing**: Vitest

## Development

```bash
# From monorepo root
npm run dev --workspace=app

# Or from this directory
npm run dev
```

Starts the Vite dev server on `http://localhost:5173`

## Building

```bash
# From monorepo root
npm run build --workspace=app

# Or from this directory
npm run build
```

Builds the application to the `dist/` directory.

## Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Linting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check
```

## Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
# ... other environment variables
```

See the main README or `.env.example` for complete list.

## Deployment

The application is deployed to Vercel as a Single Page Application (SPA).

Configuration is in `vercel.json`.

## Project Structure

```
app/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── stores/        # Zustand stores
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   └── lib/           # Library configurations
├── public/            # Static assets
├── supabase/          # Supabase migrations
└── scripts/           # Build scripts
```

## Documentation

See the main monorepo README for additional information.
