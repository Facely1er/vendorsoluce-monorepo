# ⚡ Vercel Quick Start Guide

## 🚀 Fastest Way to Deploy

### Option 1: Use the Deployment Script (Easiest)

```powershell
# Deploy both app and website
.\deploy-vercel.ps1

# Deploy only app
.\deploy-vercel.ps1 -Target app

# Deploy only website
.\deploy-vercel.ps1 -Target website

# Deploy to production
.\deploy-vercel.ps1 -Production
```

### Option 2: Manual Deployment

#### Deploy App
```bash
cd packages/app
vercel --prod
```

#### Deploy Website
```bash
cd packages/website
npm run build:css
vercel --prod
```

---

## 📋 Prerequisites

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Set Environment Variables** (for app only):
   ```bash
   cd packages/app
   vercel env add VITE_SUPABASE_URL production
   vercel env add VITE_SUPABASE_ANON_KEY production
   ```

---

## 🔑 Required Environment Variables (App Only)

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |

**Set for:** Production, Preview, and Development environments

---

## 📁 Project Structure

```
vendorsoluce-monorepo/
├── vercel.json              # App deployment config
├── packages/
│   ├── app/                 # React/Vite app
│   │   └── dist/           # Build output
│   └── website/            # Static HTML website
│       ├── vercel.json     # Website deployment config
│       └── assets/css/     # Compiled CSS (build required)
```

---

## 🎯 Deployment URLs

After deployment, you'll get:
- **App:** `https://vendorsoluce-app.vercel.app` (or custom domain)
- **Website:** `https://vendorsoluce-website.vercel.app` (or custom domain)

---

## 🔄 Continuous Deployment

Once linked to Git:
- **Push to main** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment

---

## 📚 Full Documentation

See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 🐛 Common Issues

### Build Fails
- Check environment variables are set
- Verify build works locally: `npm run build`
- Check Vercel build logs in dashboard

### Website CSS Missing
- Run `npm run build:css` in `packages/website` before deploying
- Or add build command in Vercel settings

### Environment Variables Not Working
- Variables must start with `VITE_` for Vite apps
- Redeploy after adding variables
- Set for correct environment (Production/Preview/Development)
