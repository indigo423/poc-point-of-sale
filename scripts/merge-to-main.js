#!/usr/bin/env node
import { execSync } from 'child_process';

try {
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  console.log(`Current branch: ${currentBranch}`);

  // Stash any uncommitted changes
  console.log('Stashing uncommitted changes...');
  try {
    execSync('git stash');
  } catch (e) {
    console.log('No changes to stash');
  }

  // Switch to main branch
  console.log('Switching to main branch...');
  execSync('git checkout main');

  // Pull latest changes from main
  console.log('Pulling latest changes from main...');
  execSync('git pull origin main');

  // Merge the feature branch
  console.log(`Merging ${currentBranch} into main...`);
  execSync(`git merge ${currentBranch} --no-ff -m "Merge ${currentBranch} into main: Update architecture diagram labels, pricing logic, and quote form"`);

  // Push to origin
  console.log('Pushing to origin...');
  execSync('git push origin main');

  console.log('✓ Merge completed successfully!');
} catch (error) {
  console.error('✗ Error during merge:', error.message);
  process.exit(1);
}
