# Git Commands Reference

Quick reference for common Git commands in the monorepo.

## Initial Setup

```bash
# Initialize repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: VendorSoluce monorepo setup"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/vendorsoluce-monorepo.git

# Push to remote
git branch -M main
git push -u origin main
```

## Daily Workflow

### Check Status
```bash
git status
git status --short  # Compact view
```

### View Changes
```bash
git diff                    # Unstaged changes
git diff --staged          # Staged changes
git diff HEAD              # All changes since last commit
```

### Stage and Commit
```bash
# Stage specific files
git add packages/website/index.html
git add packages/app/src/

# Stage all changes
git add .

# Commit with message
git commit -m "Update website homepage"
git commit -m "Add new feature to app"

# Commit with detailed message
git commit -m "feat: add vendor risk dashboard

- Implement risk scoring algorithm
- Add visualization components
- Update API integration"
```

## Branching

### Create and Switch Branches
```bash
# Create new branch
git branch feature/new-feature

# Switch to branch
git checkout feature/new-feature

# Create and switch in one command
git checkout -b feature/new-feature

# Switch to main branch
git checkout main
```

### List Branches
```bash
git branch              # Local branches
git branch -r           # Remote branches
git branch -a           # All branches
```

### Merge Branches
```bash
# Switch to target branch
git checkout main

# Merge feature branch
git merge feature/new-feature

# Delete merged branch
git branch -d feature/new-feature
```

## Remote Operations

### View Remotes
```bash
git remote -v           # List all remotes with URLs
```

### Push Changes
```bash
# Push current branch
git push

# Push to specific remote and branch
git push origin main

# Push new branch
git push -u origin feature/new-feature

# Force push (use with caution!)
git push --force
```

### Pull Changes
```bash
# Pull latest changes
git pull

# Pull from specific remote and branch
git pull origin main

# Fetch without merging
git fetch origin
```

## Viewing History

```bash
# View commit history
git log

# Compact one-line view
git log --oneline

# Graph view
git log --oneline --graph --all

# View specific file history
git log -- packages/website/index.html

# View changes in commit
git show <commit-hash>
```

## Undoing Changes

### Unstage Files
```bash
git reset HEAD <file>    # Unstage specific file
git reset                # Unstage all files
```

### Discard Changes
```bash
# Discard changes to file (destructive!)
git checkout -- <file>

# Discard all changes (destructive!)
git checkout -- .
```

### Amend Last Commit
```bash
# Add changes to last commit
git add .
git commit --amend

# Change commit message only
git commit --amend -m "New message"
```

### Revert Commit
```bash
# Create new commit that undoes changes
git revert <commit-hash>
```

## Tags

```bash
# Create tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# List tags
git tag

# Push tags to remote
git push origin --tags
```

## Useful Aliases

Add to `~/.gitconfig` or `.git/config`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## Monorepo-Specific Tips

### Commit Only Specific Package
```bash
# Stage only website changes
git add packages/website/
git commit -m "Update website content"

# Stage only app changes
git add packages/app/
git commit -m "Fix bug in vendor dashboard"
```

### View Changes in Package
```bash
# See what changed in website
git diff packages/website/

# See what changed in app
git diff packages/app/
```

### Commit Message Convention

Use conventional commits for better history:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

Examples:
- `feat(website): add pricing calculator`
- `fix(app): resolve vendor import issue`
- `docs: update setup instructions`

## Troubleshooting

### Merge Conflicts
```bash
# View conflicted files
git status

# Resolve conflicts, then:
git add <resolved-file>
git commit
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1  # Destructive!
```

### Recover Deleted File
```bash
git checkout HEAD -- <file>
```

### Clean Untracked Files
```bash
# Preview what will be removed
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd
```

## Advanced

### Stash Changes
```bash
# Save changes temporarily
git stash

# List stashes
git stash list

# Apply stash
git stash apply

# Apply and remove stash
git stash pop

# Drop stash
git stash drop
```

### Cherry-pick Commit
```bash
# Apply specific commit to current branch
git cherry-pick <commit-hash>
```

### Rebase
```bash
# Rebase current branch onto main
git checkout feature/branch
git rebase main

# Interactive rebase
git rebase -i HEAD~3
```

