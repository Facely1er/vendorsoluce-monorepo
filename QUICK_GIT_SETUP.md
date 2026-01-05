# Quick Git Repository Setup

## Prerequisites

Ensure Git is installed:
- Download from: https://git-scm.com/download/win
- Or use: `winget install Git.Git`

## Automated Setup (Recommended)

Run the PowerShell script:

```powershell
cd "C:\Users\facel\Downloads\GitHub\ERMITS_PRODUCTION\vendorsoluce-monorepo"
.\setup-git-repo.ps1
```

The script will:
1. Check if Git is installed
2. Initialize the repository (if needed)
3. Add all files
4. Create initial commit
5. Optionally connect to remote repository

## Manual Setup

### Step 1: Initialize Repository

```powershell
cd "C:\Users\facel\Downloads\GitHub\ERMITS_PRODUCTION\vendorsoluce-monorepo"
git init
```

### Step 2: Add Files

```powershell
git add .
```

### Step 3: Create Initial Commit

```powershell
git commit -m "Initial commit: VendorSoluce monorepo setup"
```

### Step 4: Create Remote Repository

**On GitHub:**
1. Go to https://github.com/new
2. Repository name: `vendorsoluce-monorepo`
3. **Do NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

**On GitLab:**
1. Go to https://gitlab.com/projects/new
2. Project name: `vendorsoluce-monorepo`
3. **Do NOT** initialize with README
4. Click "Create project"

### Step 5: Connect and Push

```powershell
# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/vendorsoluce-monorepo.git

# Rename branch to main
git branch -M main

# Push to remote
git push -u origin main
```

## Verify Setup

```powershell
# Check remote
git remote -v

# Check status
git status

# View commits
git log --oneline
```

## Next Steps

1. ✅ Repository initialized
2. ✅ Files committed
3. ✅ Remote connected
4. ⬜ Set up CI/CD (GitHub Actions, GitLab CI, etc.)
5. ⬜ Configure deployment (Vercel, Netlify)
6. ⬜ Set up branch protection rules
7. ⬜ Add collaborators

## Troubleshooting

### Git Not Found
- Install Git from https://git-scm.com/download/win
- Restart terminal after installation
- Verify with: `git --version`

### Authentication Issues
- Use SSH keys (recommended)
- Or use Personal Access Token for HTTPS

### Large Files
- Consider Git LFS for large files
- Check `.gitignore` excludes build outputs

For detailed instructions, see `GIT_SETUP.md`

