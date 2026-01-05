# Setup Instructions

## Initial Setup

1. **Navigate to monorepo root**
   ```bash
   cd vendorsoluce-monorepo
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```
   This will install dependencies for all packages using npm workspaces.

3. **Verify installation**
   ```bash
   # Check that all packages are linked
   npm list --workspaces
   ```

## Development Workflow

### Running Development Servers

**Run all packages:**
```bash
npm run dev
```

**Run specific package:**
```bash
# Website (CSS watch mode)
npm run dev --workspace=website

# App (Vite dev server)
npm run dev --workspace=app
```

### Building

**Build all packages:**
```bash
npm run build
```

**Build specific package:**
```bash
npm run build --workspace=website
npm run build --workspace=app
```

### Testing

```bash
# Run all tests
npm run test

# Run tests for specific package
npm run test --workspace=app
```

### Linting

```bash
# Lint all packages
npm run lint

# Lint specific package
npm run lint --workspace=app
```

## Workspace Commands

All npm commands can be scoped to workspaces:

```bash
# Syntax: npm run <script> --workspace=<package-name>
npm run build --workspace=website
npm run dev --workspace=app
npm run test --workspace=app
```

## Package-Specific Commands

### Website Package

```bash
cd packages/website

# Build CSS
npm run build:css

# Watch CSS changes
npm run watch:css
```

### App Package

```bash
cd packages/app

# Development
npm run dev

# Build
npm run build

# Test
npm run test

# Lint
npm run lint
```

## Troubleshooting

### Dependencies Not Installing

If you encounter issues with dependencies:

1. **Clear node_modules and lock file**
   ```bash
   rm -rf node_modules package-lock.json
   rm -rf packages/*/node_modules packages/*/package-lock.json
   ```

2. **Reinstall**
   ```bash
   npm install
   ```

### Workspace Commands Not Working

- Ensure you're using npm 9+ (check with `npm --version`)
- Verify `package.json` has correct `workspaces` array
- Try running commands from package directory directly

### Build Failures

- Check that all dependencies are installed
- Verify environment variables are set (for app package)
- Check package-specific READMEs for requirements

## Next Steps

1. ✅ Complete initial setup
2. ✅ Test development servers
3. ✅ Test builds
4. ✅ Update CI/CD pipelines
5. ✅ Update deployment configurations

