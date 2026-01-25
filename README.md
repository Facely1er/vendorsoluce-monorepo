# VendorSoluce Monorepo

## About VendorSoluce

**VendorSoluce** is a comprehensive Supply Chain Risk Management (SCRM) platform that helps organizations assess, monitor, and mitigate third-party vendor risks. Built with NIST SP 800-161 compliance at its core, the platform enables security teams, procurement departments, and compliance officers to:

- **Discover vendor exposure** - Identify and prioritize vendor risks across your supply chain
- **Assess security posture** - Conduct NIST-aligned assessments and SBOM vulnerability analysis
- **Close compliance gaps** - Streamline vendor onboarding and collect evidence-based proof of compliance
- **Monitor continuously** - Track vendor risk scores, compliance status, and security assessments in real-time

**Key Capabilities:**
- Supply Chain Risk Assessments (NIST SP 800-161 aligned)
- SBOM (Software Bill of Materials) vulnerability analysis
- Vendor Risk Dashboard and Analytics
- Vendor Security Assessments (CMMC, NIST Privacy Framework)
- Vendor Portal for self-service assessments
- Comprehensive tool suite (NIST Checklist, Risk Radar, Risk Calculator, Vendor IQ)

**Target Users:** Federal contractors, government agencies, enterprises managing vendor relationships, security teams, and compliance officers.

**Important Disclaimers:**
- VendorSoluce provides compliance tracking and reporting tools to assist with regulatory frameworks. These tools do not guarantee certification, regulatory compliance, or audit success. Users are responsible for interpreting results and ensuring compliance with applicable regulations.
- Performance metrics and time savings are examples and may vary based on organization size, complexity, and usage patterns. Individual results may vary.
- "Unlimited" features are subject to fair use policies. See Terms of Service for details.

---

This monorepo contains the VendorSoluce marketing website and main application platform.

## Structure

```
vendorsoluce-monorepo/
├── packages/             # Main code packages
│   ├── website/          # Marketing website (vendorsoluce.com)
│   ├── app/              # Main application (application.vendorsoluce.com)
│   └── shared/           # Shared configurations and utilities
├── docs/                 # Active documentation
├── archive/              # Archived files (see archive/README.md)
│   ├── setup/            # Git setup scripts and docs
│   ├── migrations/       # Migration documentation
│   ├── integrations/     # Integration documentation
│   └── backups/          # Backup archive files
├── NewUpdate/            # Active updates and strategies
├── package.json          # Root workspace configuration
├── turbo.json            # Turborepo build configuration
└── README.md             # This file
```

## Packages

### `packages/website`
Static HTML marketing website deployed to `vendorsoluce.com`. Contains landing pages, features, pricing, and other marketing content.

**Tech Stack**: HTML, Tailwind CSS, JavaScript

### `packages/app`
Full-stack React application for vendor risk and supply chain assurance workflow platform. The main platform deployed to `application.vendorsoluce.com`.

**Core Features:**
- Vendor risk management and assessment
- Supply chain security assessment (NIST SP 800-161 aligned)
- SBOM (Software Bill of Materials) analysis and management
- Vendor onboarding and lifecycle management
- Vendor portal (separate domain for vendor self-service)
- Vendor security assessments (CMMC Level 1 & 2, NIST Privacy Framework)
- Vendor Requirements Definition workflow
- Asset management integration
- Marketing automation and campaign management
- Multi-language support (i18n - English, French, Spanish)
- Comprehensive data import/export (JSON, CSV, PDF)

**Tool Suite:**
- **NIST Checklist Tool** - Interactive compliance checklist
- **SBOM Quick Scan** - Fast SBOM validation and vulnerability scanning
- **Vendor Risk Radar** - Visual risk assessment and privacy dimension mapping
- **Vendor Risk Calculator** - Quick risk scoring tool
- **Vendor IQ** - Intelligent vendor assessment with 4-module system

**Compliance Frameworks:**
- ✅ **NIST SP 800-161** - Fully implemented (core assessment framework)
- ✅ **CMMC 2.0** - Fully implemented (Level 1 & 2 assessments)
- ⚠️ **SOC2 Type II** - Roadmap
- ⚠️ **ISO 27001** - Roadmap
- ⚠️ **FedRAMP/FISMA** - Roadmap (Federal tier)

**Subscription & Billing:**
- Three-tier SaaS pricing: Starter ($39/mo), Professional ($129/mo), Enterprise ($399/mo)
- Annual billing with 20% discount
- 14-day free trial (no credit card required)
- Stripe payment processing with PCI-DSS compliance
- Self-service subscription management
- Automated renewal notifications (7 days for monthly, 30 days for annual)
- Cancellation confirmation emails with grace period details
- Invoice download functionality (PDF and hosted invoices)
- Refund request system with eligibility validation
- Data export capabilities before cancellation

**Tech Stack**: React 18, TypeScript, Vite, Supabase (PostgreSQL + Auth), Stripe, Tailwind CSS, Zustand, React Router

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
.\archive\setup\setup-git-repo.ps1
```

**Or see:** [QUICK_GIT_SETUP.md](./archive/setup/QUICK_GIT_SETUP.md) for detailed instructions.

**Note:** Git setup scripts have been moved to `archive/setup/` directory.

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

- **website**: Deployed to Vercel as static site (`vendorsoluce.com`)
- **app**: Deployed to Vercel as SPA (`application.vendorsoluce.com`)

**Deployment Status:**
- ✅ Production-ready with full e-commerce compliance
- ✅ Automated renewal notifications configured
- ✅ Email service (Resend) integrated
- ✅ Stripe webhooks configured for payment events
- ✅ Supabase Edge Functions for backend services

See individual package READMEs and deployment guides for detailed instructions:
- `VERCEL_DEPLOYMENT_GUIDE.md`
- `VERCEL_QUICK_START.md`
- `packages/app/IMPLEMENTATION_SUMMARY.md`

## Contributing

1. Make changes in the appropriate package
2. Test locally using `npm run dev`
3. Build and verify with `npm run build`
4. Commit changes following conventional commits

## Documentation

- **Current Setup**: See this README and `docs/` directory
- **Archived Docs**: See `archive/` directory for historical documentation
  - Setup scripts: `archive/setup/`
  - Migration docs: `archive/migrations/`
  - Integration docs: `archive/integrations/`
- **Active Updates**: See `NewUpdate/` directory for current strategies and journey documentation

## License

See individual package licenses.

