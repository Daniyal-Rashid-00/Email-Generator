# GitHub Pages Deployment Guide

## Quick Setup (No Local Installation Required!)

### Step 1: Push to GitHub

1. Initialize git (if not already done):
   ```bash
   cd "d:\Coding\Programing Projects\email-writer"
   git init
   git add .
   git commit -m "Initial commit: Email Writer app"
   ```

2. Create a new repository on GitHub (don't initialize with README)

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Save the settings

### Step 3: Wait for Deployment

- GitHub Actions will automatically build and deploy your app
- You can watch the progress in the **Actions** tab
- Once complete, your app will be live at:
  ```
  https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
  ```

## That's It! 🎉

The GitHub Actions workflow will:
- ✅ Install all dependencies automatically
- ✅ Build your React app
- ✅ Deploy to GitHub Pages
- ✅ Re-deploy automatically on every push to `main` branch

No local `npm install` needed!

## Important: Update Base Path

**If your repository name is NOT `Email-Generator`**, you need to update the base path in `vite.config.js`:

```js
base: '/YOUR_REPO_NAME/', // Change this to match your repository name
```

For example, if your repo is `my-email-app`, change it to:
```js
base: '/my-email-app/',
```

## Troubleshooting

If the deployment fails:
1. Check the **Actions** tab for error messages
2. Make sure your repository is public (or you have GitHub Pro for private repos)
3. Ensure the workflow file is in `.github/workflows/deploy.yml`
