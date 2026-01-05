# VendorSoluce Website

Static HTML marketing website for VendorSoluce, deployed to `vendorsoluce.com`.

## Overview

This package contains the marketing and landing pages for VendorSoluce, including:
- Homepage
- About page
- Features page
- Pricing page
- FAQ
- Legal pages
- Contact page

## Tech Stack

- HTML/CSS/JavaScript
- Tailwind CSS (compiled)
- Static site generation

## Development

```bash
# From monorepo root
npm run dev --workspace=website

# Or from this directory
npm run watch:css
```

## Building

```bash
# From monorepo root
npm run build --workspace=website

# Or from this directory
npm run build:css
```

This compiles Tailwind CSS from `src/tailwind.css` to `assets/css/tailwind.css`.

## Deployment

The website is deployed as a static site to:
- **Netlify**: Configured via `netlify.toml`
- **Vercel**: Configured via `vercel.json`

Both platforms serve the static HTML files directly.

## Structure

```
website/
├── index.html          # Homepage
├── about.html
├── features.html
├── pricing.html
├── faq.html
├── contact.html
├── legal/              # Legal pages
├── radar/              # Vendor risk radar tool
├── includes/           # Shared header/footer
├── assets/
│   ├── css/            # Compiled CSS
│   └── js/             # JavaScript files
└── src/
    └── tailwind.css    # Tailwind source
```

## Notes

- Always run `npm run build:css` before committing changes
- The compiled CSS file must be generated before deployment
- All HTML files reference `assets/css/tailwind.css` (not CDN)

