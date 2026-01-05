# Monorepo Migration Guide

This guide documents the migration of VendorSoluce projects into a monorepo structure.

## What Changed

### Project Locations

**Before:**
- `LANDING-SITES/vendorsoluce-website/` → Marketing website
- `05-vendorsoluce/` → Main application

**After:**
- `vendorsoluce-monorepo/packages/website/` → Marketing website
- `vendorsoluce-monorepo/packages/app/` → Main application
- `vendorsoluce-monorepo/packages/shared/` → Shared configurations

### Package Names

**Before:**
- `vendorsoluce-static` (website)
- `vendorsoluce` (app)

**After:**
- `website` (website)
- `app` (app)
- `shared` (shared)

## Migration Steps

### 1. Install Dependencies

From the monorepo root:

```bash
cd vendorsoluce-monorepo
npm install
```

This will install all dependencies for all packages using npm workspaces.

### 2. Verify Builds

Test that both packages can build:

```bash
# Build website
npm run build --workspace=website

# Build app
npm run build --workspace=app

# Build both
npm run build
```

### 3. Update CI/CD

If you have CI/CD pipelines, update them to:

1. **Change working directory** to `vendorsoluce-monorepo`
2. **Install dependencies** with `npm install` (from root)
3. **Build packages** using workspace commands:
   - `npm run build --workspace=website`
   - `npm run build --workspace=app`

### 4. Update Deployment Configs

#### Vercel/Netlify

For the **website**:
- Root directory: `vendorsoluce-monorepo/packages/website`
- Build command: `npm run build:css` (or `npm run build`)
- Output directory: `packages/website` (static files)

For the **app**:
- Root directory: `vendorsoluce-monorepo/packages/app`
- Build command: `npm run build`
- Output directory: `packages/app/dist`

### 5. Update Git Configuration

If using separate repositories, you may want to:

1. **Create a new repository** for the monorepo
2. **Migrate history** (optional, using git subtree or similar)
3. **Update remote URLs** in your local git config

### 6. Update Team Workflows

- **Marketing team**: Works in `packages/website/`
- **Development team**: Works in `packages/app/`
- **Shared changes**: Coordinate through `packages/shared/`

## Breaking Changes

### None Expected

The migration maintains:
- ✅ All file structures
- ✅ All build processes
- ✅ All deployment configs
- ✅ All functionality

### Path References

If you have any scripts or tools that reference the old paths, update them:

**Old paths:**
- `LANDING-SITES/vendorsoluce-website/...`
- `05-vendorsoluce/...`

**New paths:**
- `vendorsoluce-monorepo/packages/website/...`
- `vendorsoluce-monorepo/packages/app/...`

## Rollback Plan

If you need to rollback:

1. The original projects remain in their original locations
2. The monorepo is a copy, not a move
3. You can continue using the original projects while testing the monorepo

## Next Steps

1. ✅ Test builds in monorepo
2. ✅ Update CI/CD pipelines
3. ✅ Update deployment configurations
4. ✅ Update team documentation
5. ✅ Consider using shared Tailwind config from `packages/shared`
6. ✅ Set up Turborepo caching for faster builds

## Troubleshooting

### Build Fails

- Ensure you've run `npm install` from the root
- Check that all workspace dependencies are installed
- Verify package.json files are correct

### Workspace Commands Don't Work

- Ensure you're using npm 9+ (workspaces require npm 9+)
- Verify `package.json` has correct `workspaces` configuration
- Try running commands from the package directory directly

### Path Issues

- All relative paths within packages should still work
- If using absolute imports, they may need updating
- Check import statements for any hardcoded paths

## Support

For issues or questions:
1. Check package-specific READMEs
2. Review Turborepo documentation
3. Check npm workspaces documentation

