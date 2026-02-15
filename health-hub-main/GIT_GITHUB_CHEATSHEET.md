# 📚 Git & GitHub Complete CheatSheet

**Comprehensive guide covering every Git and GitHub scenario**

---

## 📖 Table of Contents

1. [Git Basics](#git-basics)
2. [Git Configuration](#git-configuration)
3. [Repository Management](#repository-management)
4. [Branching](#branching)
5. [Staging & Committing](#staging--committing)
6. [Viewing History](#viewing-history)
7. [Merging](#merging)
8. [Rebasing](#rebasing)
9. [Stashing](#stashing)
10. [Undoing Changes](#undoing-changes)
11. [Searching in Git](#searching-in-git)
12. [Remote Operations](#remote-operations)
13. [Conflict Resolution](#conflict-resolution)
14. [Cherry Picking](#cherry-picking)
15. [GitHub CLI](#github-cli)
16. [GitHub Web Features](#github-web-features)
17. [Common Workflows](#common-workflows)
18. [Emergency/Recovery](#emergencyrecovery)
19. [Best Practices](#best-practices)
20. [Troubleshooting](#troubleshooting)

---

## 🎯 Git Basics

### Initialize Repository
```bash
# Create new git repository
git init

# Create new git repository with a name
git init <project-name>

# Clone existing repository
git clone <url>
git clone <url> <directory>  # Clone to specific directory

# Clone specific branch
git clone -b <branch> <url>

# Clone with specific depth (shallow clone)
git clone --depth 1 <url>
```

### Check Status
```bash
# See current status
git status

# Short status format
git status -s
git status --short

# Show branch tracking info
git status -b

# Show untracked files
git status --porcelain
```

---

## ⚙️ Git Configuration

### User Configuration
```bash
# Set global user name
git config --global user.name "Your Name"

# Set global email
git config --global user.email "your.email@example.com"

# Set local user (for specific repository)
git config user.name "Local Name"
git config user.email "local@example.com"

# Set default branch name
git config --global init.defaultBranch main

# List all configurations
git config --list
git config --global --list
git config --local --list

# Edit config file
git config --global --edit
git config --local --edit

# Remove configuration
git config --global --unset user.name
```

### Editor Configuration
```bash
# Set default editor
git config --global core.editor "code"        # VSCode
git config --global core.editor "vim"         # Vim
git config --global core.editor "nano"        # Nano

# Set merge tool
git config --global merge.tool "meld"
git config --global mergetool.meld.path "/Applications/Meld.app/Contents/MacOS/Meld"
```

### Aliases (Custom Commands)
```bash
# Create command aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'restore --staged'
git config --global alias.last 'log -1 HEAD'
git config --global alias.graph 'log --graph --oneline --all'
git config --global alias.amend 'commit --amend --no-edit'

# Usage: git st, git co, git br, etc.
```

---

## 📁 Repository Management

### Repository Information
```bash
# Show repository root directory
git rev-parse --show-toplevel

# Show .git directory path
git rev-parse --git-dir

# Check if directory is git repository
git rev-parse --is-inside-work-tree

# Show repository name
git rev-parse --show-cdup
```

### Repository Statistics
```bash
# Count commits
git rev-list --count HEAD
git rev-list --count <branch>

# Count commits by author
git shortlog -sn

# Show authors
git shortlog -sne

# Repository size
du -sh .git

# Show files in staging area
git ls-files

# Show tracked files
git ls-tree -r HEAD
```

---

## 🌳 Branching

### Create & List Branches
```bash
# List local branches
git branch
git branch --list

# List all branches (local + remote)
git branch -a

# List remote branches only
git branch -r

# List branches with last commit
git branch -v

# List branches not merged
git branch --no-merged

# List merged branches
git branch --merged

# Create new branch
git branch <branch-name>

# Create branch from specific commit
git branch <branch-name> <commit-sha>

# Create branch from remote tracking
git branch <branch-name> origin/<remote-branch>
```

### Switch Branches
```bash
# Switch to branch
git checkout <branch-name>
git checkout -                           # Switch to previous branch

# Switch and create branch
git checkout -b <branch-name>

# Switch with specific start point
git checkout -b <branch-name> origin/<remote-branch>

# Using newer syntax (Git 2.23+)
git switch <branch-name>
git switch -c <branch-name>              # Create and switch
git switch -                              # Switch to previous
```

### Rename Branches
```bash
# Rename current branch
git branch -m <new-name>

# Rename specific branch
git branch -m <old-name> <new-name>

# Rename and update tracking
git branch -m <old> <new>
git push origin -u <new>
git push origin --delete <old>
```

### Delete Branches
```bash
# Delete local branch (safe - won't delete if not merged)
git branch -d <branch-name>

# Force delete local branch
git branch -D <branch-name>

# Delete remote branch
git push origin --delete <branch-name>
git push origin -d <branch-name>          # Short form
git push origin :<branch-name>            # Alternative

# Delete multiple branches
git branch -d branch1 branch2 branch3

# Delete all merged branches
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

### Branch Information
```bash
# Show branch tracking info
git branch -vv

# Set upstream for current branch
git branch -u origin/<branch>
git branch --set-upstream-to=origin/<branch>

# Unset upstream
git branch --unset-upstream

# Compare branches
git log <branch1>..<branch2>              # Commits in branch2 not in branch1
git log <branch1>...<branch2>             # Commits different between

# Show branches containing commit
git branch -a --contains <commit>

# Show branches containing tag
git branch -a --contains <tag>
```

---

## 📝 Staging & Committing

### Staging Changes
```bash
# Stage all changes
git add .
git add -A
git add --all

# Stage specific file
git add <file>

# Stage multiple files
git add file1 file2 file3

# Stage with pattern
git add *.js
git add src/

# Stage modified and deleted, not untracked
git add -u
git add --update

# Stage interactively (choose hunks)
git add -i
git add --interactive

# Stage part of file (by line)
git add -p
git add --patch

# Unstage files
git restore --staged <file>
git reset <file>
git reset HEAD <file>

# Unstage all
git restore --staged .
git reset
git reset HEAD
```

### Committing
```bash
# Create commit
git commit -m "commit message"

# Commit with longer message
git commit -m "title" -m "description"

# Commit staged changes
git commit --message "message"

# Commit all changes (tracked files only)
git commit -am "message"
git commit -a -m "message"

# Amend last commit (without new commit)
git commit --amend
git commit --amend --no-edit                # Keep same message
git commit --amend -m "new message"

# Amend with different author
git commit --amend --author="Name <email>"

# Create commit with specific date
git commit --date="2 days ago" -m "message"
git commit --date="Jan 13, 2022 20:20:21 EST" -m "message"

# Commit with GPG signature
git commit -S -m "message"

# Create empty commit
git commit --allow-empty -m "empty commit"
```

### View Staged Changes
```bash
# Show staged changes
git diff --staged
git diff --cached

# Show staged changes for specific file
git diff --staged <file>

# Show both staged and unstaged
git diff HEAD

# Show what will be committed
git status
```

---

## 🔍 Viewing History

### View Commits
```bash
# Show commit history
git log
git log --oneline                         # Short format
git log -n 10                             # Last 10 commits
git log --max-count=10                    # Max 10 commits
git log -5                                # Last 5 commits

# Show with stats
git log --stat
git log --stat --oneline

# Show with changes
git log -p
git log --patch
git log -p -2                             # Last 2 commits with changes

# Pretty formatting
git log --pretty=oneline
git log --pretty=short
git log --pretty=full
git log --pretty=fuller
git log --pretty=format:"%H %an %s"

# Custom format
git log --format="%h %s"
git log --format="%an: %s"
git log --graph --oneline --all
```

### Filter Commits
```bash
# Commits by author
git log --author="Name"
git log --author="name@example.com"

# Commits in date range
git log --since="2 weeks ago"
git log --since="Jan 1, 2023"
git log --until="2023-01-31"
git log --since="2023-01-01" --until="2023-01-31"

# Commits matching message
git log --grep="pattern"
git log --grep="bug fix"                  # Case-sensitive
git log -i --grep="pattern"               # Case-insensitive

# Commits by date
git log --after="2023-01-01"
git log --before="2023-12-31"

# Commits in range
git log <from>..<to>
git log main..feature                     # Commits in feature not in main

# Reverse order
git log --reverse

# Show commits for specific file
git log <file>
git log -p <file>                         # With changes
git log --follow <file>                   # Including renames

# Show line history
git log -L <start>,<end>:<file>
git log -L 10,20:src/file.js
```

### Show Specific Commits
```bash
# Show specific commit
git show <commit-sha>

# Show specific file at commit
git show <commit-sha>:<path/to/file>

# Show commit metadata only
git show --name-only <commit>
git show --name-status <commit>

# Show commit changes in format
git show <commit> --stat
git show <commit> -p

# Show previous version of file
git show HEAD~1:<file>
git show HEAD^^:<file>
```

### Diff Operations
```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged
git diff --cached

# Compare commits
git diff <commit1> <commit2>
git diff HEAD^ HEAD                       # Last vs previous-last
git diff main feature                     # Between branches

# Compare branches for specific file
git diff main feature -- <file>

# Show diff stats
git diff --stat
git diff main feature --stat

# Diff word level
git diff --word-diff

# Show diff in specific lines
git diff -U10                             # 10 lines context
```

### Blame & Annotate
```bash
# Show who changed each line
git blame <file>

# Show who changed specific lines
git blame -L 10,20 <file>

# Show changes with commit info
git blame -C -C <file>

# Show in shortstat format
git shortlog -s -n
```

---

## 🔀 Merging

### Basic Merge
```bash
# Merge branch into current branch
git merge <branch-name>

# Merge with specific strategy
git merge --strategy=recursive <branch>
git merge --strategy=ours <branch>
git merge --strategy=theirs <branch>

# Merge without fast-forward
git merge --no-ff <branch>

# Merge with commit message
git merge -m "merge message" <branch>

# Merge squash (combine commits)
git merge --squash <branch>

# Merge with no commit (review before commit)
git merge --no-commit <branch>
```

### Merge Status
```bash
# Check merge status
git status                                # Shows merge in progress

# See which files have conflicts
git diff --name-conflicts
git diff --name-only --diff-filter=U

# Show conflicted files
git ls-files --unmerged
```

### Abort & Continue Merge
```bash
# Abort merge (go back to before)
git merge --abort

# Continue merge after fixing conflicts
git add <fixed-files>
git commit -m "merge message"

# Skip merge of specific commit
git merge --continue
```

---

## ⚡ Rebasing

### Basic Rebase
```bash
# Rebase current branch onto another
git rebase <branch>
git rebase main                           # Rebase onto main

# Rebase specific branch
git rebase main feature

# Rebase interactive (modify history)
git rebase -i HEAD~3                      # Last 3 commits
git rebase -i <commit>                    # Up to specific commit

# Rebase onto commit before
git rebase -i HEAD~5

# Interactive rebase with main
git rebase -i main
```

### Interactive Rebase Commands
```
In interactive rebase editor:

pick     - use commit
reword   - use commit but edit message
edit     - use commit but amend
squash   - use commit but combine with previous
fixup    - like squash but discard log
drop     - remove commit
exec     - run shell command
break    - pause rebase

Example:
pick abc1234 First commit
squash def5678 Second commit
reword ghi9012 Third commit
```

### Rebase Options
```bash
# Continue rebase after conflict
git rebase --continue

# Skip current commit in rebase
git rebase --skip

# Abort rebase
git rebase --abort

# Rebase with autostash
git rebase --autostash <branch>

# Rebase preserving merges
git rebase --preserve-merges
git rebase -p

# Rebase with specific strategy
git rebase -s recursive <branch>
git rebase -s resolve <branch>
```

### Rebase vs Merge
```bash
# Rebase (clean linear history)
git rebase main

# Merge (preserves branch history)
git merge main

# Rebase and merge (linear + merge commit)
git merge --no-ff main
```

---

## 📦 Stashing

### Stash Changes
```bash
# Stash current changes
git stash
git stash save                            # Older syntax

# Stash with message
git stash save "message"
git stash push -m "message"

# Stash specific file
git stash push <file>
git stash push src/file.js

# Stash multiple files
git stash push file1.js file2.js

# Stash with pattern
git stash push -- "*.js"

# Stash untracked files
git stash -u
git stash --include-untracked

# Stash all including ignored
git stash -a
git stash --all

# Keep staged changes
git stash --keep-index

# Partial stash (interactive)
git stash push -p
git stash --patch
```

### List Stashes
```bash
# List all stashes
git stash list
git stash list --oneline

# Show specific stash
git stash show stash@{0}
git stash show stash@{0} -p                # With changes

# Show stash changes
git stash show -p
git stash show <index> -p
```

### Apply & Pop Stashes
```bash
# Apply stash (keep in list)
git stash apply

# Apply specific stash
git stash apply stash@{0}
git stash apply stash@{1}

# Pop stash (apply and remove)
git stash pop
git stash pop stash@{0}

# Pop with specific index
git stash pop 0

# Apply stash to different branch
git stash apply stash@{0}
```

### Delete Stashes
```bash
# Delete specific stash
git stash drop stash@{0}

# Delete all stashes
git stash clear

# Delete multiple stashes
git stash drop stash@{0}
git stash drop stash@{1}
```

### Advanced Stashing
```bash
# Create branch from stash
git stash branch <branch-name>
git stash branch <branch-name> stash@{0}

# Stash changes on current branch
git stash push -m "wip"

# Check if stash applies cleanly
git stash show <stash>

# Show stash diff
git stash diff

# Create patch from stash
git stash show -p > stash.patch
```

---

## ↩️ Undoing Changes

### Undo Unstaged Changes
```bash
# Discard changes in working directory
git restore <file>
git checkout -- <file>               # Older syntax
git checkout -- .                    # All files

# Restore to specific commit
git restore --source=<commit> <file>
git restore --source=HEAD~2 <file>

# Restore specific version
git checkout <branch> -- <file>
git checkout main -- config.py
```

### Undo Staged Changes
```bash
# Unstage file
git restore --staged <file>
git reset HEAD <file>                # Older syntax
git reset <file>

# Unstage all
git restore --staged .
git reset
git reset HEAD
```

### Undo Commits
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific commit
git reset --soft HEAD~3               # Undo last 3
git reset --hard <commit>

# Create new commit with opposite changes
git revert HEAD
git revert <commit>
git revert --no-commit HEAD           # Create but don't commit

# Revert multiple commits
git revert HEAD~2..HEAD
git revert -n HEAD~2..HEAD             # No auto-commit
```

### Reset vs Revert
```bash
git reset --soft HEAD~1    # Undo commit, keep changes staged
git reset --mixed HEAD~1   # Undo commit, keep changes unstaged (default)
git reset --hard HEAD~1    # Undo commit, discard changes
git revert HEAD~1          # Create opposite commit (safe for pushed)
```

### Undo Merges
```bash
# Undo last merge
git reset --hard HEAD~1

# Undo merge with revert
git revert -m 1 HEAD       # Keep first parent
git revert -m 2 HEAD       # Keep second parent

# Reset to before merge
git reset --hard ORIG_HEAD
```

---

## 🔎 Searching in Git

### Search in History
```bash
# Find commits with text in message
git log --grep="text"
git log -i --grep="text"               # Case-insensitive

# Find commits modifying lines
git log -S "text"                      # Pickaxe search
git log -G "pattern"                   # Regex search

# Find commits adding/removing line
git log -p -S "text" <file>

# Find blame for text
git log -p --all -S "text"
```

### Search in Content
```bash
# Search in tracked files
git grep "search term"
git grep -n "text"                     # With line numbers
git grep -i "text"                     # Case-insensitive

# Search in specific file
git grep "text" -- path/to/file

# Search in specific ref
git grep "text" main
git grep "text" HEAD~1

# Search in all tracked files
git grep "text" --all

# Count occurrences
git grep -c "text"

# Show full context
git grep -A 2 -B 2 "text"

# Search with regex
git grep --extended-regexp "pattern"
```

### Find Commits
```bash
# Find commit that introduced line
git log -S "text" -p

# Find commit that deleted line
git log --source --all -S "text"

# Blame specific line
git blame -L 10,20 file.js

# Show when line was changed
git log -p -L 10,20:file.js
```

---

## 🌐 Remote Operations

### View Remotes
```bash
# List remotes
git remote
git remote -v                          # With URLs

# Show remote info
git remote show origin
git remote info origin                 # Detailed info

# Show remote tracking branches
git branch -r
```

### Add & Remove Remotes
```bash
# Add remote
git remote add origin <url>
git remote add upstream <url>

# Add remote with specific branch
git remote add -t main origin <url>

# Remove remote
git remote remove origin
git remote rm origin

# Rename remote
git remote rename origin main
git remote rename upstream upstream-repo
```

### Fetch & Pull
```bash
# Fetch from remote
git fetch
git fetch origin
git fetch upstream

# Fetch specific branch
git fetch origin main
git fetch origin feature:local-feature

# Fetch all remotes
git fetch --all

# Fetch with prune (remove deleted branches)
git fetch --prune
git fetch -p

# Fetch tags
git fetch --tags
git fetch origin --tags

# Pull (fetch + merge)
git pull
git pull origin main

# Pull with rebase
git pull --rebase
git pull origin main --rebase

# Pull fast-forward only
git pull --ff-only
```

### Push
```bash
# Push to remote
git push
git push origin main

# Push specific branch
git push origin <branch>

# Push to tracked branch
git push -u origin <branch>             # Set upstream
git push --set-upstream origin <branch>

# Push all branches
git push --all

# Push tags
git push --tags
git push origin <tag>

# Force push
git push --force
git push -f origin main                 # Dangerous!

# Force push safely (refuse if upstream changed)
git push --force-with-lease
git push --force-with-lease origin main

# Delete remote branch
git push origin --delete <branch>
git push origin -d <branch>
git push origin :<branch>               # Alternative

# Push multiple branches
git push origin branch1 branch2

# Push with new branch name
git push origin local:remote
```

### Tracking Branches
```bash
# Set upstream for current branch
git branch -u origin/main
git branch --set-upstream-to=origin/main

# Set upstream on push
git push -u origin main

# Unset upstream
git branch --unset-upstream

# Show tracking info
git branch -vv

# Track and pull
git checkout --track origin/feature
git checkout -b feature --track origin/feature
```

---

## 🔧 Conflict Resolution

### Merge Conflicts
```bash
# See conflict files
git status                             # Shows "both modified"
git diff --name-conflicts
git ls-files --unmerged

# Show conflicts in file
git diff <file>

# Show our version
git show :1:<file>                     # Ours
git show :2:<file>                     # Theirs
git show :3:<file>                     # Base

# Resolve conflict strategy
git checkout --ours <file>             # Keep our changes
git checkout --theirs <file>           # Accept their changes

# Resolve all conflicts (ours)
git checkout --ours .

# Resolve all conflicts (theirs)
git checkout --theirs .

# Add resolved files
git add <file>
git add .

# Mark as resolved
git add <file>                         # Add resolved file

# Continue merge
git commit                             # After resolving
```

### Rebase Conflicts
```bash
# In rebase with conflicts
git status                             # Shows conflict files

# Resolve like merge
git checkout --ours <file>
git add <file>

# Continue rebase
git rebase --continue

# Skip this commit
git rebase --skip

# Abort rebase
git rebase --abort
```

### Merge Tools
```bash
# Launch merge tool
git mergetool

# Use specific merge tool
git mergetool meld
git mergetool vimdiff
git mergetool kdiff3

# Abort using merge tool
git merge --abort
```

---

## 🎯 Cherry Picking

### Cherry Pick Commits
```bash
# Cherry pick single commit
git cherry-pick <commit-sha>

# Cherry pick range
git cherry-pick <commit1>..<commit2>    # Exclusive of commit1
git cherry-pick <commit1>^..<commit2>   # Inclusive

# Cherry pick multiple commits
git cherry-pick <sha1> <sha2> <sha3>

# Cherry pick with message edit
git cherry-pick --edit <commit>
git cherry-pick -e <commit>

# Cherry pick without commit
git cherry-pick --no-commit <commit>
git cherry-pick -n <commit>

# Cherry pick from other branch
git cherry-pick other-branch
git cherry-pick feature/new-feature
```

### Cherry Pick Options
```bash
# Continue after conflict
git cherry-pick --continue

# Skip current commit
git cherry-pick --skip

# Abort cherry-pick
git cherry-pick --abort

# Show cherry-pick status
git status

# Use specific strategy
git cherry-pick -X ours <commit>
git cherry-pick -X theirs <commit>
```

### Find Cherry Picks
```bash
# Find which commits are cherry-picked
git log --cherry-pick -p main..feature

# Show cherry-pick equivalent commits
git log -p --cherry-mark --oneline main..feature

# Find cherry-picked commits
git log --reverse --cherry-pick main..feature
```

---

## 🐙 GitHub CLI

### Authentication
```bash
# Login to GitHub
gh auth login

# Show login status
gh auth status

# Logout
gh auth logout

# Switch account
gh auth login                          # Login with different account
```

### Repository Operations
```bash
# Clone repository
gh repo clone <owner/repo>
gh repo clone <owner/repo> <directory>

# Create new repository
gh repo create <repo-name>
gh repo create <repo-name> --private

# Create from template
gh repo create <repo-name> --template <owner/template>

# Create and push
gh repo create <repo-name> --source=. --push

# List repositories
gh repo list
gh repo list <owner>

# View repository info
gh repo view
gh repo view <owner/repo>

# Edit repository
gh repo edit
gh repo edit --description "New description"
```

### Issues
```bash
# Create issue
gh issue create
gh issue create --title "Title" --body "Description"

# List issues
gh issue list
gh issue list -a <assignee>
gh issue list --state=open
gh issue list --state=closed

# View issue
gh issue view <number>
gh issue view <number> --web                # Open in browser

# Close issue
gh issue close <number>

# Add comment to issue
gh issue comment <number> -m "Comment text"

# Add label
gh issue edit <number> --add-label "bug"
```

### Pull Requests
```bash
# Create pull request
gh pr create
gh pr create --title "Title" --body "Description"
gh pr create --base main --head feature

# List pull requests
gh pr list
gh pr list --state open
gh pr list -a <author>

# View PR
gh pr view <number>
gh pr view <number> --web                # Open in browser

# Check out PR
gh pr checkout <number>

# Close PR
gh pr close <number>

# Merge PR
gh pr merge <number>
gh pr merge <number> --squash
gh pr merge <number> --rebase

# Add comment
gh pr comment <number> -b "Comment"

# Add review
gh pr review <number> --comment
gh pr review <number> --approve
gh pr review <number> --request-changes
```

### Gists
```bash
# Create gist
gh gist create <file>

# List gists
gh gist list

# View gist
gh gist view <gist-id>

# Delete gist
gh gist delete <gist-id>
```

---

## 🌐 GitHub Web Features

### Syncing

```bash
# Sync fork with upstream
# In GitHub: Click "Sync fork"
# Or using CLI:
git fetch upstream
git rebase upstream/main
git push origin main
```

### Issues & PRs

```bash
# Using web interface
1. Create issue
2. Create PR from branch
3. Request reviewers
4. Resolve conversations
5. Approve/Request changes
6. Merge when ready
```

### GitHub Actions (CI/CD)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
```

---

## 📋 Common Workflows

### Feature Branch Workflow
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Make changes and commit
git add .
git commit -m "Add new feature"

# 4. Push to remote
git push -u origin feature/new-feature

# 5. Create PR on GitHub

# 6. Merge to main
git checkout main
git merge feature/new-feature
git push origin main

# 7. Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Fork Workflow (Contributing)
```bash
# 1. Fork on GitHub

# 2. Clone fork
git clone https://github.com/YOUR_USERNAME/project.git
cd project

# 3. Add upstream
git remote add upstream https://github.com/ORIGINAL_OWNER/project.git

# 4. Create feature branch
git checkout -b fix/bug-fix

# 5. Make changes
# ... edit files ...

# 6. Commit and push
git commit -m "Fix bug"
git push origin fix/bug-fix

# 7. Create PR on GitHub

# 8. Sync fork with upstream
git fetch upstream
git rebase upstream/main
git push -f origin main
```

### Release Workflow
```bash
# 1. Create release branch
git checkout -b release/v1.0.0

# 2. Update version numbers
# ... update package.json, etc ...

# 3. Commit
git commit -m "Bump version to v1.0.0"

# 4. Tag release
git tag -a v1.0.0 -m "Version 1.0.0"

# 5. Merge to main
git checkout main
git merge --no-ff release/v1.0.0

# 6. Push to remote
git push origin main --tags

# 7. Delete release branch
git branch -d release/v1.0.0
```

### Hotfix Workflow
```bash
# 1. Create hotfix branch from main
git checkout main
git checkout -b hotfix/fix-critical-bug

# 2. Make fix
git commit -m "Fix critical bug"

# 3. Tag
git tag -a v1.0.1 -m "Critical fix"

# 4. Merge to main
git checkout main
git merge --no-ff hotfix/fix-critical-bug

# 5. Merge to develop
git checkout develop
git merge --no-ff hotfix/fix-critical-bug

# 6. Push
git push origin main develop --tags

# 7. Delete hotfix
git branch -d hotfix/fix-critical-bug
```

---

## 🆘 Emergency/Recovery

### Recover Deleted Commits
```bash
# Show all commits ever made
git reflog

# Find deleted commit in reflog
git reflog | grep "commit message"

# Recover commit
git checkout <commit-sha>

# Create branch from recovered commit
git checkout -b recovered-branch <commit-sha>
```

### Undo Last Push
```bash
# Show push history
git reflog origin/main

# Reset to before push
git reset --hard HEAD@{1}

# Force push to fix remote
git push -f origin main              # Use with caution!

# Safe alternative: use revert
git revert HEAD
git push origin main
```

### Fix Wrong Branch Push
```bash
# Undo push
git reset --hard HEAD~1

# Push correct branch
git checkout correct-branch
git push origin correct-branch

# Fix with force (use with caution)
git push -f origin main
```

### Recover from Rebase Disaster
```bash
# Find original position
git reflog

# Restore to before rebase
git reset --hard <original-ref>

# Or create branch from backup
git branch recovered-branch <original-ref>
```

### Clean Up Local Changes
```bash
# Remove untracked files
git clean -fd
git clean -fdX                        # Include ignored
git clean -fdi                        # Interactive

# Reset to remote state
git fetch origin
git reset --hard origin/main

# Remove all local changes
git checkout .                        # Keep untracked
git clean -fd                        # Remove untracked
```

---

## ✅ Best Practices

### Commit Messages
```bash
# Good commit format:
# [Type] Brief message (50 chars)
# 
# Detailed explanation (wrap at 72)
#
# - Bullet point 1
# - Bullet point 2

# Types
# feat:     New feature
# fix:      Bug fix
# docs:     Documentation
# style:    Formatting
# refactor: Code refactoring
# test:     Adding tests
# chore:    Maintenance

# Example
git commit -m "feat: Add user authentication

- Implement login/logout
- Add JWT token support
- Create auth middleware"
```

### Branch Naming
```bash
# Good branch names
git checkout -b feature/user-auth
git checkout -b fix/login-bug
git checkout -b docs/api-documentation
git checkout -b refactor/authentication

# Avoid
# - Too long: feature/this-is-a-very-long-feature-name
# - Unclear: feature/stuff or fix/it
# - Special chars: feature/user@auth
```

### Before Pushing
```bash
# 1. Check status
git status

# 2. Review changes
git diff

# 3. Update from remote
git pull --rebase

# 4. Run tests
npm test

# 5. Check commit history
git log -3

# 6. Push
git push
```

### Collaboration
```bash
# Always pull before working
git pull

# Keep commits small and focused
# One feature = one logical change

# Write clear commit messages
# Use branch naming conventions

# Review your own code first
git diff main..feature

# Keep branch updated
git rebase main
```

---

## 🐛 Troubleshooting

### Issue: Merge Conflicts
```bash
# Solution 1: Keep ours
git checkout --ours file.js
git add file.js
git commit

# Solution 2: Keep theirs
git checkout --theirs file.js
git add file.js
git commit

# Solution 3: Manual editing
# Edit file manually
# Resolve conflict markers
git add file.js
git commit
```

### Issue: Detached HEAD
```bash
# Explanation: HEAD pointing to commit, not branch

# Solution: Create or checkout branch
git checkout -b new-branch
git checkout main                    # If exists
```

### Issue: Lost Commits
```bash
# Check reflog
git reflog

# Find commit
git log --all --grep="message"

# Create branch
git checkout -b recovered <commit>
```

### Issue: Wrong Branch Merged
```bash
# Undo merge
git revert -m 1 HEAD

# Or reset (if not pushed)
git reset --hard HEAD~1

# Then merge correct branch
git merge correct-branch
```

### Issue: File Accidentally Deleted
```bash
# Restore file
git restore <file>
git checkout -- <file>

# Restore specific version
git restore --source=HEAD~1 <file>
```

### Issue: Commit to Wrong Branch
```bash
# 1. Create branch with commits
git branch feature

# 2. Reset main to before
git reset --hard HEAD~N

# 3. Switch to feature
git checkout feature

# Now on feature branch with commits
```

### Issue: Need to Undo Published Commit
```bash
# Safe method: create opposite commit
git revert <commit>
git push

# Unsafe method: force push
git reset --hard HEAD~1
git push -f                          # DON'T use carelessly!
```

### Issue: Can't Push (Rejected)
```bash
# Reason: Remote has changes you don't have

# Solution 1: Pull and merge
git pull
git push

# Solution 2: Pull with rebase
git pull --rebase
git push

# Solution 3: Force (only if you're sure)
git push --force-with-lease
```

### Issue: Tags Not Pushing
```bash
# Push specific tag
git push origin <tag-name>

# Push all tags
git push --tags
git push origin --tags

# Delete remote tag
git push origin -d <tag-name>
git push origin --delete <tag-name>
```

### Issue: Large File Problems
```bash
# Remove file from history
git filter-branch --tree-filter 'rm -f <file>' HEAD

# Or use git-filter-repo
git filter-repo --path <file> --invert-paths
```

---

## 📚 Quick Reference Table

| Task | Command |
|------|---------|
| **Status** | `git status` |
| **Add files** | `git add .` |
| **Commit** | `git commit -m "msg"` |
| **Push** | `git push` |
| **Pull** | `git pull` |
| **Create branch** | `git checkout -b name` |
| **Switch branch** | `git checkout name` |
| **Merge** | `git merge name` |
| **View history** | `git log` |
| **Show diff** | `git diff` |
| **Undo changes** | `git restore .` |
| **Undo commit** | `git reset --soft HEAD~1` |
| **Stash** | `git stash` |
| **Tag** | `git tag v1.0.0` |
| **Remote** | `git remote -v` |

---

## 🎓 Learning Resources

- Official Git Documentation: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com
- Interactive Learning: https://learngitbranching.js.org
- Git Cheat Sheet: https://github.github.com/training-kit/

---

**Status:** ✅ Complete CheatSheet  
**Last Updated:** February 14, 2026  
**Coverage:** 150+ commands & scenarios

🎉 **Master Git like a pro with this comprehensive guide!**


