# Set Environment Variables in Vercel

## Quick Setup Instructions

I've prepared the values for you. Here are two ways to set them:

### Method 1: Run the PowerShell Script (Easiest)

```powershell
cd "C:\Users\facel\Downloads\GitHub\ERMITS_MONOREPOS\vendorsoluce-monorepo"
.\set-env-vars.ps1
```

### Method 2: Manual Vercel CLI Commands

Run these commands one by one:

```powershell
cd "C:\Users\facel\Downloads\GitHub\ERMITS_MONOREPOS\vendorsoluce-monorepo"

# Set Supabase URL
vercel env add VITE_SUPABASE_URL production
# When prompted, paste: https://dfklqsdfycwjlcasfciu.supabase.co

# Set Supabase Anon Key  
vercel env add VITE_SUPABASE_ANON_KEY production
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRma2xxc2RmeWN3amxjYXNmY2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODA5OTcsImV4cCI6MjA3OTk1Njk5N30.OiaL5SkKnMlpdfW2Y2L-m2mzmCFA_LgpUq2-m8XF-yQ
```

### Method 3: Vercel Dashboard (If CLI doesn't work)

1. Go to: https://vercel.com/dashboard
2. Select: **vendorsoluce-monorepo**
3. Go to: **Settings** → **Environment Variables**
4. Click: **Add New**

**Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: `https://dfklqsdfycwjlcasfciu.supabase.co`
- Environment: Select **Production**, **Preview**, **Development**

**Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRma2xxc2RmeWN3amxjYXNmY2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODA5OTcsImV4cCI6MjA3OTk1Njk5N30.OiaL5SkKnMlpdfW2Y2L-m2mzmCFA_LgpUq2-m8XF-yQ`
- Environment: Select **Production**, **Preview**, **Development**

## After Setting Variables

1. Vercel will automatically trigger a new deployment
2. Wait 1-2 minutes for deployment to complete
3. Visit: https://vendorsoluce-monorepo.vercel.app
4. The errors should be resolved! ✅

## Verify Variables Are Set

```powershell
vercel env ls
```

You should see both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` listed.
