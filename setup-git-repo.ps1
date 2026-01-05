# VendorSoluce Monorepo - Git Repository Setup Script
# Run this script from the monorepo root directory

Write-Host "=== VendorSoluce Monorepo Git Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
$gitInstalled = $false
try {
    $null = git --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        $gitVersion = git --version
        Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
        $gitInstalled = $true
    }
} catch {
    $gitInstalled = $false
}

if (-not $gitInstalled) {
    Write-Host "Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Navigate to monorepo directory
$monorepoPath = $PSScriptRoot
Set-Location $monorepoPath
Write-Host "Working directory: $monorepoPath" -ForegroundColor Gray
Write-Host ""

# Check if git is already initialized
if (Test-Path .git) {
    Write-Host "Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git repository initialized" -ForegroundColor Green
}

Write-Host ""

# Check current status
Write-Host "Current Git status:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Ask if user wants to add all files
$addFiles = Read-Host "Add all files to staging? (Y/n)"
if ($addFiles -eq "" -or $addFiles -eq "Y" -or $addFiles -eq "y") {
    Write-Host "Adding all files..." -ForegroundColor Yellow
    git add .
    Write-Host "Files added to staging" -ForegroundColor Green
    Write-Host ""
    
    # Ask for commit message
    $commitMessage = Read-Host "Enter commit message (default: 'Initial commit: VendorSoluce monorepo setup')"
    if ($commitMessage -eq "") {
        $commitMessage = "Initial commit: VendorSoluce monorepo setup"
    }
    
    Write-Host "Creating initial commit..." -ForegroundColor Yellow
    git commit -m $commitMessage
    Write-Host "Initial commit created" -ForegroundColor Green
    Write-Host ""
}

# Ask about remote repository
Write-Host "=== Remote Repository Setup ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "To connect to a remote repository:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub/GitLab/etc." -ForegroundColor White
Write-Host "2. Do NOT initialize with README, .gitignore, or license" -ForegroundColor White
Write-Host "3. Copy the repository URL" -ForegroundColor White
Write-Host ""
Write-Host "Then run these commands:" -ForegroundColor Yellow
Write-Host "  git remote add origin YOUR_REPO_URL" -ForegroundColor White
Write-Host "  git branch -M main" -ForegroundColor White
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""

$addRemote = Read-Host "Do you want to add a remote repository now? (y/N)"
if ($addRemote -eq "y" -or $addRemote -eq "Y") {
    $remoteUrl = Read-Host "Enter remote repository URL"
    if ($remoteUrl -ne "") {
        Write-Host "Adding remote repository..." -ForegroundColor Yellow
        git remote add origin $remoteUrl
        Write-Host "Remote repository added: $remoteUrl" -ForegroundColor Green
        Write-Host ""
        
        $pushNow = Read-Host "Push to remote now? (y/N)"
        if ($pushNow -eq "y" -or $pushNow -eq "Y") {
            Write-Host "Renaming branch to main..." -ForegroundColor Yellow
            git branch -M main
            Write-Host "Pushing to remote..." -ForegroundColor Yellow
            git push -u origin main
            Write-Host "Pushed to remote repository" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Yellow
Write-Host "  git status              - Check repository status" -ForegroundColor White
Write-Host "  git remote -v          - View remote repositories" -ForegroundColor White
Write-Host "  git log --oneline      - View commit history" -ForegroundColor White
Write-Host ""

