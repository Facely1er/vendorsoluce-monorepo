# 🚀 Vercel Deployment Guide

This guide explains how to deploy both the **app** (React/Vite) and **website** (static HTML) packages to Vercel.

## 📋 Overview

Your monorepo contains:
- **`packages/app`** - React/Vite application (SPA)
- **`packages/website`** - Static HTML marketing website

## 🎯 Deployment Options

### Option 1: Separate Vercel Projects (Recommended)

Deploy each package as a separate Vercel project. This gives you:
- Independent deployments
- Separate domains/subdomains
- Independent scaling and configuration

### Option 2: Monorepo with Multiple Projects

Use Vercel's monorepo support to deploy both from the same repository.

---

## 🚀 Option 1: Deploy as Separate Projects

### Step 1: Deploy the App (React/Vite)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to the app directory**:
   ```bash
   cd packages/app
   ```

4. **Deploy the app**:
   ```bash
   vercel
   ```
   
   When prompted:
   - **Set up and deploy?** → Yes
   - **Which scope?** → Select your account/team
   - **Link to existing project?** → No (first time) or Yes (if updating)
   - **Project name?** → `vendorsoluce-app` (or your preferred name)
   - **Directory?** → `packages/app`
   - **Override settings?** → No (we'll configure via vercel.json)

5. **Configure build settings** (if not using vercel.json):
   - **Framework Preset:** Vite
   - **Build Command:** `cd ../.. && npm run build:app`
   - **Output Directory:** `packages/app/dist`
   - **Install Command:** `cd ../.. && npm install`
   - **Root Directory:** Leave empty (or set to root of monorepo)

6. **Set Environment Variables**:
   Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   
   Add these required variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   Optional variables:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   VITE_APP_ENV=production
   VITE_APP_NAME=VendorSoluce
   ```
   
   Set for: **Production**, **Preview**, and **Development**

7. **Update Root vercel.json** (if deploying from root):
   The root `vercel.json` is already configured for the app. Make sure it points to:
   ```json
   {
     "buildCommand": "npm run build:app",
     "outputDirectory": "packages/app/dist",
     "installCommand": "npm install",
     "framework": "vite"
   }
   ```

### Step 2: Deploy the Website (Static HTML)

1. **Navigate to the website directory**:
   ```bash
   cd packages/website
   ```

2. **Build the CSS** (required before deployment):
   ```bash
   npm run build:css
   ```

3. **Deploy the website**:
   ```bash
   vercel
   ```
   
   When prompted:
   - **Set up and deploy?** → Yes
   - **Which scope?** → Select your account/team
   - **Link to existing project?** → No (first time)
   - **Project name?** → `vendorsoluce-website` (or your preferred name)
   - **Directory?** → `packages/website`
   - **Override settings?** → No

4. **Configure build settings**:
   - **Framework Preset:** Other
   - **Build Command:** `cd ../.. && npm install && cd packages/website && npm run build:css`
   - **Output Directory:** `packages/website` (or leave empty)
   - **Install Command:** `cd ../.. && npm install`
   - **Root Directory:** Leave empty

5. **The website package already has a `vercel.json`** with proper configuration.

### Step 3: Link Projects to Git (Optional but Recommended)

1. Go to Vercel Dashboard → Your Project → Settings → Git
2. Connect your GitHub/GitLab/Bitbucket repository
3. Configure:
   - **Root Directory:** Leave empty (monorepo root)
   - **Production Branch:** `main` or `master`
   - **Build Command:** (auto-detected from vercel.json)
   - **Output Directory:** (auto-detected from vercel.json)

---

## 🏗️ Option 2: Monorepo with Multiple Projects

If you want both projects in the same Vercel account but as separate deployments:

### Setup

1. **Deploy App Project**:
   ```bash
   cd packages/app
   vercel --prod
   ```
   Name it: `vendorsoluce-app`

2. **Deploy Website Project**:
   ```bash
   cd packages/website
   npm run build:css  # Build CSS first
   vercel --prod
   ```
   Name it: `vendorsoluce-website`

3. **Configure in Vercel Dashboard**:
   - Each project will have its own settings
   - Both will deploy from the same repository
   - Vercel will detect changes in respective directories

### Configure Monorepo Detection

Vercel automatically detects monorepos. To ensure proper detection:

1. Make sure `package.json` has workspaces configured (already done)
2. In Vercel Dashboard → Project Settings → General:
   - **Root Directory:** Leave empty (or set to monorepo root)
   - **Build Command:** Will use vercel.json or auto-detect
   - **Output Directory:** Will use vercel.json or auto-detect

---

## 🔧 Build Configuration

### App Build Process

The app uses Vite and builds to `packages/app/dist`:
- **Build Command:** `npm run build:app` (from root) or `npm run build` (from packages/app)
- **Output:** `packages/app/dist`
- **Framework:** Vite (SPA)

### Website Build Process

The website is static HTML but requires CSS compilation:
- **Build Command:** `cd packages/website && npm run build:css`
- **Output:** `packages/website` (entire directory)
- **Framework:** Static HTML

---

## 🌍 Environment Variables

### App Environment Variables (Required)

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Yes |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ❌ Optional |
| `VITE_APP_ENV` | Environment (production/demo) | ❌ Optional |
| `VITE_APP_NAME` | Application name | ❌ Optional |

**Important:** 
- All `VITE_*` variables are exposed to the client
- Set for **Production**, **Preview**, and **Development** environments
- After adding variables, redeploy the project

### Website Environment Variables

The website package doesn't require environment variables (it's static HTML).

---

## 📝 Vercel Configuration Files

### Root `vercel.json` (for App)

Already configured in the root directory. This is used when deploying the app from the root.

### `packages/website/vercel.json` (for Website)

Already configured with:
- Clean URLs
- Redirects
- Security headers

---

## 🚀 Quick Deploy Commands

### Deploy App
```bash
cd packages/app
vercel --prod
```

### Deploy Website
```bash
cd packages/website
npm run build:css
vercel --prod
```

### Deploy Both (from root)
```bash
# Build website CSS first
cd packages/website && npm run build:css && cd ../..

# Deploy app
cd packages/app && vercel --prod && cd ../..

# Deploy website
cd packages/website && vercel --prod
```

---

## 🔄 Continuous Deployment

Once linked to Git:

1. **Automatic Deployments:**
   - Push to `main`/`master` → Production deployment
   - Push to other branches → Preview deployment
   - Pull requests → Preview deployment

2. **Monorepo Detection:**
   - Vercel detects changes in `packages/app` → Deploys app
   - Vercel detects changes in `packages/website` → Deploys website
   - If both change, both deploy

3. **Build Optimization:**
   - Vercel caches `node_modules` between builds
   - Turborepo handles build caching internally

---

## 🐛 Troubleshooting

### App Build Fails

1. **Check environment variables:**
   ```bash
   vercel env ls
   ```

2. **Verify build locally:**
   ```bash
   cd packages/app
   npm run build
   ```

3. **Check Vercel build logs:**
   - Dashboard → Deployments → Click on failed deployment → View logs

### Website Build Fails

1. **Ensure CSS is built:**
   ```bash
   cd packages/website
   npm run build:css
   ```

2. **Check for missing dependencies:**
   ```bash
   cd packages/website
   npm install
   ```

### Monorepo Not Detected

1. **Verify package.json workspaces:**
   ```json
   "workspaces": ["packages/app", "packages/shared", "packages/website"]
   ```

2. **Set Root Directory in Vercel:**
   - Dashboard → Settings → General → Root Directory
   - Leave empty or set to repository root

### Environment Variables Not Working

1. **Redeploy after adding variables:**
   - Variables are only available after redeployment

2. **Check variable names:**
   - Must start with `VITE_` for Vite apps
   - Case-sensitive

3. **Verify environment scope:**
   - Set for Production, Preview, and Development as needed

---

## 📚 Additional Resources

- [Vercel Monorepo Guide](https://vercel.com/docs/concepts/monorepos)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)

---

## ✅ Deployment Checklist

### App Deployment
- [ ] Install Vercel CLI
- [ ] Login to Vercel
- [ ] Deploy app project
- [ ] Set environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Verify deployment works
- [ ] Link to Git repository (optional)

### Website Deployment
- [ ] Build CSS (`npm run build:css`)
- [ ] Deploy website project
- [ ] Verify static files are served correctly
- [ ] Test redirects and clean URLs
- [ ] Link to Git repository (optional)

### Post-Deployment
- [ ] Test both deployments
- [ ] Configure custom domains (if needed)
- [ ] Set up monitoring/analytics
- [ ] Document deployment URLs

---

## 🎉 Next Steps

After successful deployment:

1. **Custom Domains:**
   - Add custom domains in Vercel Dashboard → Settings → Domains
   - Example: `app.vendorsoluce.com` for app, `vendorsoluce.com` for website

2. **Analytics:**
   - Enable Vercel Analytics in Dashboard
   - Already configured in app with `@vercel/analytics`

3. **Performance:**
   - Monitor build times and optimize if needed
   - Use Vercel's Edge Network for global performance

4. **CI/CD:**
   - Automatic deployments on Git push
   - Preview deployments for pull requests
