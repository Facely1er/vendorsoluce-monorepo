# 🚀 Quick Environment Variables Setup for Vercel

## Found Values from Production Setup

Based on your `05-vendorsoluce` project, here are the values:

- **VITE_SUPABASE_URL**: `https://nuwfdvwqiynzhbbsqagw.supabase.co`

## ⚡ Quick Setup (Choose One Method)

### Method 1: Vercel Dashboard (Easiest - Recommended)

1. Go to: https://vercel.com/dashboard
2. Select project: **vendorsoluce-monorepo**
3. Go to: **Settings** → **Environment Variables**
4. Click: **Add New**

**Add Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: `https://nuwfdvwqiynzhbbsqagw.supabase.co`
- Environment: Select **Production**, **Preview**, and **Development**
- Click **Save**

**Add Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: [Get from Supabase Dashboard → Settings → API → anon public key]
- Environment: Select **Production**, **Preview**, and **Development**
- Click **Save**

### Method 2: Vercel CLI (Interactive)

Run these commands in your terminal:

```powershell
cd "C:\Users\facel\Downloads\GitHub\ERMITS_MONOREPOS\vendorsoluce-monorepo"

# Set Supabase URL
vercel env add VITE_SUPABASE_URL production
# When prompted, paste: https://nuwfdvwqiynzhbbsqagw.supabase.co

# Set Supabase Anon Key
vercel env add VITE_SUPABASE_ANON_KEY production
# When prompted, paste your Supabase anon key
```

### Method 3: Get Supabase Anon Key

If you need to find your Supabase anon key:

1. Go to: https://supabase.com/dashboard
2. Select your project (the one with URL: `nuwfdvwqiynzhbbsqagw.supabase.co`)
3. Go to: **Settings** → **API**
4. Copy the **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## ✅ After Setup

1. Vercel will automatically trigger a new deployment
2. Wait 1-2 minutes for the deployment to complete
3. Visit your app: https://vendorsoluce-monorepo.vercel.app
4. The errors should be resolved!

## 🔍 Verify Variables Are Set

To verify your environment variables are configured:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. You should see both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` listed
3. Make sure they're enabled for **Production** environment

## 🐛 Troubleshooting

If you still see errors after setting variables:
- Make sure variables are set for **Production** environment (not just Preview/Development)
- Wait for the automatic redeploy to complete
- Check deployment logs in Vercel Dashboard
- Clear browser cache and hard refresh (Ctrl+Shift+R)
