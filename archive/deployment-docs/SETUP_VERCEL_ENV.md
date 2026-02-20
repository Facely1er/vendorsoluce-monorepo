# 🚀 Quick Setup: Vercel Environment Variables

## Required Environment Variables

Your React app needs these environment variables to work properly. Follow the steps below to configure them in Vercel.

### Minimum Required (to fix the current error):

1. **VITE_SUPABASE_URL** - Your Supabase project URL
2. **VITE_SUPABASE_ANON_KEY** - Your Supabase anonymous/public key

### How to Set Environment Variables in Vercel

#### Option 1: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **vendorsoluce-monorepo**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add each variable:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: Your Supabase URL (e.g., `https://xxxxx.supabase.co`)
   - **Environment**: Select **Production**, **Preview**, and **Development**
   - Click **Save**
6. Repeat for `VITE_SUPABASE_ANON_KEY`

#### Option 2: Using Vercel CLI

Run these commands (replace with your actual values):

```bash
vercel env add VITE_SUPABASE_URL production
# Paste your Supabase URL when prompted

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste your Supabase anon key when prompted
```

### Where to Get Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **anon public** key → Use for `VITE_SUPABASE_ANON_KEY`

### After Adding Variables

1. **Redeploy**: Vercel will automatically trigger a new deployment
   - Or manually redeploy: Go to **Deployments** → Click **Redeploy** on the latest deployment
2. **Verify**: Check the deployment logs to ensure the build succeeds
3. **Test**: Visit your deployment URL to verify the app loads without errors

### Current Deployment URL

- Production: https://vendorsoluce-monorepo-d4tltrpcr-facelys-projects.vercel.app
- Or: https://vendorsoluce-monorepo.vercel.app

### Optional: Additional Environment Variables

If you want to enable Stripe payments and other features, you can also add:

- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_APP_ENV=production`
- `VITE_APP_NAME=VendorSoluce`

See `packages/app/VERCEL_ENVIRONMENT_SETUP.md` for the complete list.
