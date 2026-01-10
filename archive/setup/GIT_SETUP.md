# Git Repository Setup Guide

## Initial Setup

### 1. Initialize Git Repository (if not already done)

```bash
cd vendorsoluce-monorepo
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: VendorSoluce monorepo setup"
```

## Creating Remote Repository

### Option 1: GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `vendorsoluce-monorepo` (or your preferred name)
   - Description: "VendorSoluce monorepo - Marketing website and main application"
   - Choose Public or Private
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Connect local repository to remote:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/vendorsoluce-monorepo.git
   ```

3. **Push to remote:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Option 2: GitLab

1. **Create a new project on GitLab:**
   - Go to https://gitlab.com/projects/new
   - Project name: `vendorsoluce-monorepo`
   - Visibility: Public or Private
   - **Do NOT** initialize with README
   - Click "Create project"

2. **Connect local repository:**
   ```bash
   git remote add origin https://gitlab.com/YOUR_USERNAME/vendorsoluce-monorepo.git
   ```

3. **Push to remote:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Option 3: Other Git Hosting

Follow similar steps for other platforms (Bitbucket, Azure DevOps, etc.)

## Quick Setup Script

You can use this PowerShell script to automate the setup:

```powershell
# Navigate to monorepo
cd "C:\Users\facel\Downloads\GitHub\ERMITS_PRODUCTION\vendorsoluce-monorepo"

# Initialize git if needed
if (-not (Test-Path .git)) {
    git init
}

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: VendorSoluce monorepo setup"

# Add remote (replace with your repository URL)
# git remote add origin https://github.com/YOUR_USERNAME/vendorsoluce-monorepo.git

# Push to remote
# git branch -M main
# git push -u origin main
```

## Verification

After setting up the remote, verify it's connected:

```bash
# Check remote URL
git remote -v

# Check status
git status

# View commits
git log --oneline
```

## Branch Strategy

Recommended branch structure:

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

## CI/CD Integration

Once the repository is set up, you can:

1. **Set up GitHub Actions** (if using GitHub):
   - Create `.github/workflows/ci.yml`
   - Configure build and test workflows

2. **Set up GitLab CI** (if using GitLab):
   - Create `.gitlab-ci.yml`
   - Configure pipelines

3. **Connect to Vercel/Netlify:**
   - Import repository
   - Configure build settings for each package
   - Set up deployment previews

## Notes

- The `.gitignore` file is already configured to exclude:
  - `node_modules/`
  - Build outputs (`dist/`, `dist-demo/`)
  - Environment files (`.env*`)
  - Editor files
  - Turbo cache

- Large files or sensitive data should not be committed
- Environment variables should be set in your deployment platform

## Troubleshooting

### Remote Already Exists

If you get "remote origin already exists":

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin YOUR_REPO_URL
```

### Authentication Issues

If you encounter authentication issues:

1. **Use SSH instead of HTTPS:**
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/vendorsoluce-monorepo.git
   ```

2. **Set up SSH keys** (if not already done):
   - Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
   - Add to GitHub/GitLab: Settings → SSH Keys

3. **Use Personal Access Token** (for HTTPS):
   - Create token in GitHub/GitLab settings
   - Use token as password when pushing

### Large Repository

If the repository is large:

```bash
# Check repository size
git count-objects -vH

# Consider using Git LFS for large files
git lfs install
git lfs track "*.zip"
git lfs track "*.xlsx"
```

