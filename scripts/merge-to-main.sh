#!/bin/bash
set -e

# Get the current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $CURRENT_BRANCH"

# Stash any uncommitted changes
echo "Stashing uncommitted changes..."
git stash

# Switch to main branch
echo "Switching to main branch..."
git checkout main

# Pull latest changes from main
echo "Pulling latest changes from main..."
git pull origin main

# Merge the feature branch
echo "Merging $CURRENT_BRANCH into main..."
git merge $CURRENT_BRANCH --no-ff -m "Merge $CURRENT_BRANCH into main: Update architecture diagram labels, pricing logic, and quote form"

# Push to origin
echo "Pushing to origin..."
git push origin main

echo "Merge completed successfully!"
