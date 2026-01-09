# VendorSoluce Monorepo

This monorepo contains the VendorSoluce marketing website and main application platform.

## Structure

```
vendorsoluce-monorepo/
├── packages/
│   ├── website/          # Marketing website (vendorsoluce.com)
│   ├── app/              # Main application (app.vendorsoluce.com)
│   └── shared/           # Shared configurations and utilities
├── package.json          # Root workspace configuration
├── turbo.json            # Turborepo build configuration
└── README.md
```

## Packages

### `packages/website`
Static HTML marketing website deployed to `vendorsoluce.com`. Contains landing pages, features, pricing, and other marketing content.

**Tech Stack**: HTML, Tailwind CSS, JavaScript

### `packages/app`
Full-stack React application for vendor risk and supply chain assurance workflow platform. The main platform deployed to `app.vendorsoluce.com`.

**Core Features:**
- Vendor risk management and assessment
- Supply chain security assessment (NIST SP 800-161 aligned)
- SBOM (Software Bill of Materials) analysis and management
- Vendor onboarding and lifecycle management
- Vendor portal (separate domain for vendor self-service)
- Vendor security assessments
- Asset management integration
- Marketing automation and campaign management
- Multi-language support (i18n)

**Tool Suite:**
- NIST Checklist Tool
- SBOM Quick Scan
- Vendor Risk Radar
- Vendor Risk Calculator
- Vendor IQ

**Tech Stack**: React, TypeScript, Vite, Supabase, Stripe

### `packages/shared`
Shared configurations, design tokens, and utilities used across both packages.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Git (for version control)

### Git Repository Setup

To set up the Git repository and connect to a remote:

**Quick Setup:**
```bash
.\setup-git-repo.ps1
```

**Or see:** [QUICK_GIT_SETUP.md](./QUICK_GIT_SETUP.md) for detailed instructions.

### Installation

```bash
# Install all dependencies
npm install

# Install dependencies for a specific package
npm install --workspace=website
npm install --workspace=app
```

### Development

```bash
# Run all packages in development mode
npm run dev

# Run specific package
npm run dev --workspace=website
npm run dev --workspace=app
```

### Building

```bash
# Build all packages
npm run build

# Build specific package
npm run build:website
npm run build:app
```

### Linting

```bash
# Lint all packages
npm run lint

# Lint specific package
npm run lint --workspace=app
```

## Workspace Commands

All npm commands can be scoped to specific workspaces:

```bash
# Run command in specific workspace
npm run <script> --workspace=<package-name>

# Example: Run dev server for website
npm run dev --workspace=website

# Example: Run tests for app
npm run test --workspace=app
```

## Deployment

Each package has its own deployment configuration:

- **website**: Deployed to Netlify/Vercel as static site
- **app**: Deployed to Vercel as SPA

See individual package READMEs for deployment instructions.

## Contributing

1. Make changes in the appropriate package
2. Test locally using `npm run dev`
3. Build and verify with `npm run build`
4. Commit changes following conventional commits

## License

See individual package licenses.

