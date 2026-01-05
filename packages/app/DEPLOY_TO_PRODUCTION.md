# 🚀 Deploy to Production - Quick Start Guide

## Prerequisites

✅ **Production Credentials Configured:**
- Supabase URL and keys
- Stripe live keys
- Vercel token

---

## Step 1: Configure Vercel Environment Variables

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `vendorsoluce.com`
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables for **Production** environment:

#### Required Variables:

```
VITE_SUPABASE_URL = https://nuwfdvwqiynzhbbsqagw.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d2ZkdndxaXluemhiYnNxYWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDQxMjQsImV4cCI6MjA3NzIyMDEyNH0.9X_HxnSYDFqzxvzEUMx1dGg4GPHyw13oQfxpCXprsX8
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d2ZkdndxaXluemhiYnNxYWd3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTY0NDEyNCwiZXhwIjoyMDc3MjIwMTI0fQ.bWa5K7YIi3KW_4FGdnC0Y63-B5UICFTx9n0H1Vg_JVs
VITE_STRIPE_PUBLISHABLE_KEY = pk_live_51SN9R3I8FTbdI7aV7VqkNvllrQpyDbUcMgC0siDO3kWLBH2674mUyyZ5WHnlzYftGsWaly462J2W9fQJYBZ0XYDF00SegxJfHl
STRIPE_SECRET_KEY = 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
VITE_APP_ENV = production
VITE_APP_VERSION = 1.0.0
VITE_APP_NAME = VendorSoluce
```

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add VITE_SUPABASE_URL production
# Paste: https://nuwfdvwqiynzhbbsqagw.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d2ZkdndxaXluemhiYnNxYWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDQxMjQsImV4cCI6MjA3NzIyMDEyNH0.9X_HxnSYDFqzxvzEUMx1dGg4GPHyw13oQfxpCXprsX8

vercel env add STRIPE_SECRET_KEY production
# Paste: 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

vercel env add VITE_STRIPE_PUBLISHABLE_KEY production
# Paste: pk_live_51SN9R3I8FTbdI7aV7VqkNvllrQpyDbUcMgC0siDO3kWLBH2674mUyyZ5WHnlzYftGsWaly462J2W9fQJYBZ0XYDF00SegxJfHl

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d2ZkdndxaXluemhiYnNxYWd3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTY0NDEyNCwiZXhwIjoyMDc3MjIwMTI0fQ.bWa5K7YIi3KW_4FGdnC0Y63-B5UICFTx9n0H1Vg_JVs

vercel env add VITE_APP_ENV production
# Paste: production
```

---

## Step 2: Configure Supabase Edge Functions

Set secrets for Supabase Edge Functions (webhook handlers):

```bash
# Using Supabase CLI
npx supabase secrets set STRIPE_SECRET_KEY=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

npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d2ZkdndxaXluemhiYnNxYWd3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTY0NDEyNCwiZXhwIjoyMDc3MjIwMTI0fQ.bWa5K7YIi3KW_4FGdnC0Y63-B5UICFTx9n0H1Vg_JVs

npx supabase secrets set APP_URL=https://vendorsoluce.com
```

Or configure in Supabase Dashboard:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select project: `nuwfdvwqiynzhbbsqagw`
3. Navigate to **Settings** → **Edge Functions** → **Secrets**
4. Add each secret

---

## Step 3: Run Database Migrations

### Option A: Using Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor**
4. Run each migration file from `supabase/migrations/` in order:
   - `20250101000000_stripe_integration.sql`
   - `20250108000000_fix_function_search_path.sql` ⚠️ **NEW - Security Fix**
   - `20250108000001_fix_rls_policy_performance.sql` ⚠️ **NEW - Performance Fix**
   - `20250108000002_fix_multiple_permissive_policies.sql` ⚠️ **NEW - Performance Fix**
   - `20250108000003_fix_rls_enabled_no_policy.sql` ⚠️ **NEW - Security Fix**
   - `20250108000004_fix_unindexed_foreign_keys.sql` ⚠️ **NEW - Performance Fix**
   - `20250115_vendor_assessments_tables.sql`
   - `20250701042959_crimson_waterfall.sql`
   - `20250722160541_withered_glade.sql`
   - `20250724052026_broad_castle.sql`
   - `20251004090256_rename_tables_with_vs_prefix.sql`
   - `20251004090354_rename_tables_with_vs_prefix.sql`
   - `20251107_asset_management.sql`
   - `20251204_stripe_integration.sql`

### Option B: Using Supabase CLI

```bash
# Link to your project
npx supabase link --project-ref nuwfdvwqiynzhbbsqagw

# Push all migrations
npx supabase db push
```

---

## Step 4: Configure Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Set endpoint URL: `https://nuwfdvwqiynzhbbsqagw.supabase.co/functions/v1/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret (`whsec_...`)
6. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET = whsec_your_webhook_secret
   ```
7. Add to Supabase Edge Functions secrets:
   ```bash
   npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

---

## Step 5: Deploy to Production

### Option A: Using Vercel CLI

```bash
# Navigate to project directory
cd vendorsoluce.com

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to production
vercel --prod --token GHgsANNuU3amkHubJLSnSoOU
```

### Option B: Using Git Push (if CI/CD configured)

```bash
# Commit and push to main branch
git add .
git commit -m "Ready for production deployment"
git push origin main
```

Vercel will automatically deploy on push to main branch.

---

## Step 6: Verify Deployment

### ✅ Post-Deployment Checklist

- [ ] **Application loads correctly**
  - Visit your production URL
  - Verify homepage loads

- [ ] **Authentication works**
  - Test sign up
  - Test sign in
  - Test sign out
  - Test password reset

- [ ] **Core features work**
  - Test vendor management
  - Test SBOM analysis
  - Test assessments
  - Test dashboard

- [ ] **Stripe integration works**
  - Test checkout flow
  - Verify webhook receives events
  - Test subscription management

- [ ] **Error monitoring**
  - Check Sentry for errors
  - Verify error tracking works

- [ ] **Performance**
  - Check page load times
  - Verify Core Web Vitals
  - Monitor API response times

---

## Step 7: Configure Monitoring

### Sentry (Error Tracking)

1. Create Sentry project at [sentry.io](https://sentry.io)
2. Get DSN
3. Add to Vercel environment variables:
   ```
   VITE_SENTRY_DSN = your_sentry_dsn
   VITE_SENTRY_ENVIRONMENT = production
   ```

### Uptime Monitoring (Recommended)

Set up external uptime monitoring:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)
- [StatusCake](https://www.statuscake.com)

Monitor your production URL every 5 minutes.

---

## 🚨 Troubleshooting

### Build Fails

```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Clean build
rm -rf dist node_modules
npm install
npm run build
```

### Environment Variables Not Working

1. Verify variables are set in Vercel Dashboard
2. Ensure environment is set to "Production"
3. Redeploy after adding variables
4. Check deployment logs in Vercel

### Database Connection Issues

1. Verify Supabase URL and keys are correct
2. Check Supabase project is active
3. Verify RLS policies are enabled
4. Test connection in Supabase Dashboard

### Stripe Issues

1. Verify Stripe keys are live keys (not test)
2. Check webhook endpoint is configured
3. Verify webhook secret matches
4. Check Stripe Dashboard for webhook events

---

## 📋 Quick Reference

### Production URLs

- **Application:** https://vendorsoluce.com (or your Vercel URL)
- **Supabase:** https://nuwfdvwqiynzhbbsqagw.supabase.co
- **Stripe Dashboard:** https://dashboard.stripe.com

### Important Credentials

- **Vercel Token:** `GHgsANNuU3amkHubJLSnSoOU`
- **Supabase Project:** `nuwfdvwqiynzhbbsqagw`
- **Stripe Account:** Live mode

---

## ✅ Success Criteria

Your deployment is successful when:

1. ✅ Application loads without errors
2. ✅ Authentication works end-to-end
3. ✅ Core features are functional
4. ✅ Stripe checkout completes successfully
5. ✅ No critical errors in Sentry
6. ✅ Performance metrics are acceptable

---

## 🎉 Next Steps

After successful deployment:

1. Monitor error rates (Sentry)
2. Monitor performance metrics
3. Gather user feedback
4. Iterate and improve
5. Plan feature enhancements

---

**Status:** ✅ Ready for Production Deployment  
**Last Updated:** January 2025

