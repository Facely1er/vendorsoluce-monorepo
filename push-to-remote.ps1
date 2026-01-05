# Push VendorSoluce Monorepo to Remote Repository
# Usage: .\push-to-remote.ps1 [repository-url]

param(
    [string]$RemoteUrl = ""
)

$env:Path += ";C:\Program Files\Git\bin"

Write-Host "=== Push to Remote Repository ===" -ForegroundColor Cyan
Write-Host ""

# Check if remote URL is provided
if ($RemoteUrl -eq "") {
    Write-Host "No remote URL provided." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please provide the repository URL:" -ForegroundColor Yellow
    Write-Host "  Example: .\push-to-remote.ps1 https://github.com/Facely1er/vendorsoluce-monorepo.git" -ForegroundColor White
    Write-Host ""
    $RemoteUrl = Read-Host "Enter remote repository URL (or press Enter to skip)"
    
    if ($RemoteUrl -eq "") {
        Write-Host "No URL provided. Exiting." -ForegroundColor Red
        exit 1
    }
}

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $update = Read-Host "Update to new URL? (y/N)"
    if ($update -eq "y" -or $update -eq "Y") {
        git remote set-url origin $RemoteUrl
        Write-Host "Remote URL updated" -ForegroundColor Green
    } else {
        Write-Host "Using existing remote" -ForegroundColor Green
        $RemoteUrl = $existingRemote
    }
} else {
    # Add remote
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $RemoteUrl
    Write-Host "Remote added: $RemoteUrl" -ForegroundColor Green
}

Write-Host ""

# Check current branch
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Gray
Write-Host ""

# Push to remote
Write-Host "Pushing to remote repository..." -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin $currentBranch
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Successfully pushed to remote repository!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Repository URL: $RemoteUrl" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "Push failed. Common issues:" -ForegroundColor Red
        Write-Host "  - Authentication required (use Personal Access Token or SSH)" -ForegroundColor Yellow
        Write-Host "  - Repository doesn't exist or you don't have access" -ForegroundColor Yellow
        Write-Host "  - Network connectivity issues" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error pushing: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Complete ===" -ForegroundColor Cyan

