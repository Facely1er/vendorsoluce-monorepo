# 🔧 Vercel Build Troubleshooting Guide

## ✅ Fixed Issues

### Build Command Issue (FIXED)
**Problem:** `vercel.json` was using `npm run build --workspace=app` which doesn't work with Turbo monorepo setup.

**Solution:** Changed to `npm run build:app` which uses Turbo correctly.

---

## 🐛 Common Build Failures & Solutions

### 1. Build Command Errors

**Error:** `Command "npm run build --workspace=app" failed`

**Solution:** ✅ Already fixed in `vercel.json`
- Build command now uses: `npm run build:app`
- This correctly uses Turbo to build the app package

---

### 2. TypeScript Compilation Errors

**Error:** `Type error: ...` or `TS2307: Cannot find module...`

**Solutions:**
1. **Check TypeScript config:**
   ```bash
   cd packages/app
   npm run type-check
   ```

2. **Verify all dependencies are installed:**
   ```bash
   npm install
   ```

3. **Check for missing type definitions:**
   ```bash
   npm install --save-dev @types/[missing-package]
   ```

---

### 3. Missing Dependencies

**Error:** `Cannot find module '...'` or `Module not found`

**Solutions:**
1. **Ensure all dependencies are in package.json:**
   - Check `packages/app/package.json` has all required dependencies
   - Run `npm install` from root directory

2. **Check for peer dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Verify workspace setup:**
   - Root `package.json` should have workspaces configured
   - All packages should be listed in workspaces array

---

### 4. Environment Variable Issues

**Error:** Build succeeds but app fails at runtime with missing env vars

**Note:** Missing environment variables typically don't cause build failures, but can cause runtime errors.

**Solutions:**
1. **Set required environment variables in Vercel:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Set for: Production, Preview, and Development

2. **Verify variable names:**
   - Must start with `VITE_` for Vite apps
   - Case-sensitive

3. **Redeploy after adding variables:**
   - Variables are only available after redeployment

---

### 5. Turbo Build Cache Issues

**Error:** Build fails with cache-related errors

**Solutions:**
1. **Clear Turbo cache:**
   ```bash
   npm run clean
   turbo run build --force
   ```

2. **Disable remote caching temporarily:**
   - In Vercel, the build will use local cache
   - Check if issue persists

---

### 6. Node Version Mismatch

**Error:** `The engine "node" is incompatible with this module`

**Solutions:**
1. **Check Node version requirement:**
   - Root `package.json` specifies: `"node": ">=18.0.0"`

2. **Set Node version in Vercel:**
   - Go to Vercel Dashboard → Project → Settings → General
   - Set Node.js Version to `18.x` or `20.x`

3. **Or add `.nvmrc` file:**
   ```bash
   echo "18" > .nvmrc
   ```

---

### 7. Build Timeout

**Error:** Build times out after X minutes

**Solutions:**
1. **Optimize build:**
   - Check for unnecessary dependencies
   - Use build caching (Turbo handles this)

2. **Check build logs:**
   - Identify which step is taking too long
   - Optimize that specific step

3. **Contact Vercel support:**
   - If build legitimately needs more time
   - They can increase timeout limits

---

### 8. Output Directory Not Found

**Error:** `Output directory "packages/app/dist" not found`

**Solutions:**
1. **Verify build completes:**
   - Check build logs to ensure build actually ran
   - Look for "built in X.XXs" message

2. **Check output directory:**
   - Verify `packages/app/dist` exists after build
   - If not, build might have failed silently

3. **Verify vercel.json:**
   - `outputDirectory` should be `packages/app/dist`
   - ✅ Already configured correctly

---

### 9. Monorepo Detection Issues

**Error:** Vercel doesn't detect monorepo correctly

**Solutions:**
1. **Verify root directory:**
   - In Vercel Dashboard → Settings → General
   - Root Directory should be empty (or set to repository root)

2. **Check package.json workspaces:**
   ```json
   "workspaces": [
     "packages/app",
     "packages/shared",
     "packages/website"
   ]
   ```

3. **Ensure turbo.json exists:**
   - Should be in root directory
   - ✅ Already exists

---

### 10. Install Command Issues

**Error:** `npm install` fails

**Solutions:**
1. **Check package-lock.json:**
   - Ensure it's committed to git
   - Or use `npm ci` instead of `npm install`

2. **Update install command in vercel.json:**
   ```json
   "installCommand": "npm ci"
   ```
   (More reliable for CI/CD)

3. **Check for dependency conflicts:**
   ```bash
   npm install --legacy-peer-deps
   ```

---

## 🔍 Debugging Steps

### Step 1: Test Build Locally
```bash
# From root directory
npm run build:app
```

If this fails locally, fix the issue before deploying to Vercel.

### Step 2: Check Vercel Build Logs
1. Go to Vercel Dashboard → Deployments
2. Click on the failed deployment
3. View build logs
4. Look for the specific error message

### Step 3: Verify Configuration
- ✅ `vercel.json` build command: `npm run build:app`
- ✅ Output directory: `packages/app/dist`
- ✅ Install command: `npm install`
- ✅ Framework: `vite`

### Step 4: Check Environment Variables
- Go to Vercel Dashboard → Settings → Environment Variables
- Verify all required variables are set
- Check they're set for the correct environments

---

## 📋 Build Checklist

Before deploying, verify:

- [ ] Build works locally: `npm run build:app`
- [ ] TypeScript compiles: `cd packages/app && npm run type-check`
- [ ] All dependencies installed: `npm install`
- [ ] `vercel.json` has correct build command
- [ ] Environment variables set in Vercel
- [ ] Node version compatible (>=18.0.0)
- [ ] Output directory exists after build

---

## 🆘 Still Having Issues?

If the build still fails after trying these solutions:

1. **Check Vercel Build Logs:**
   - Copy the exact error message
   - Note which step failed

2. **Compare with Local Build:**
   - Does it build locally?
   - If yes, the issue is likely environment-specific

3. **Common Differences:**
   - Node version
   - Environment variables
   - File permissions
   - Build cache

4. **Get Help:**
   - Share the exact error from Vercel build logs
   - Include your `vercel.json` configuration
   - Mention if local build works

---

## ✅ Current Configuration (Verified)

```json
{
  "buildCommand": "npm run build:app",
  "outputDirectory": "packages/app/dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

This configuration should work correctly with your Turbo monorepo setup.
