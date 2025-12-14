# Deploy to Vercel - Step by Step Guide

## Why Vercel?
- ✅ **Free** - No credit card required
- ✅ **Supports Private Repos** - Keep your code private
- ✅ **Automatic Deployments** - Deploys on every push
- ✅ **Better Performance** - Global CDN
- ✅ **Easy Setup** - Just connect your GitHub repo

## Step-by-Step Instructions

### Step 1: Make Your GitHub Repo Private (Optional)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Danger Zone**
4. Click **Change visibility** → **Make private**
5. Confirm the change

**Note**: You can skip this if you want to keep it public.

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (top right)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### Step 3: Import Your Repository

1. After signing in, you'll see the Vercel dashboard
2. Click **Add New...** → **Project**
3. You'll see a list of your GitHub repositories
4. Find **Email-Generator** (or your repo name)
5. Click **Import** next to it

### Step 4: Configure Project Settings

Vercel will auto-detect Vite, but verify these settings:

**Framework Preset**: Vite (should be auto-detected)

**Root Directory**: `./` (leave as default)

**Build Command**: `npm run build` (should be auto-filled)

**Output Directory**: `dist` (should be auto-filled)

**Install Command**: `npm install` (should be auto-filled)

### Step 5: Add Environment Variable

**This is crucial for your API key:**

1. In the project configuration page, find **Environment Variables** section
2. Click to expand it
3. Add a new variable:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSyD7aezdpE-DAmGxVd_dC5w9NZXDRL62_II` (your actual API key)
4. Make sure it's enabled for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **Add**

### Step 6: Deploy!

1. Review all settings
2. Click **Deploy** button
3. Wait 1-2 minutes for the build to complete
4. You'll see a success message with your live URL!

### Step 7: Get Your Live URL

After deployment, you'll get a URL like:
- `https://email-generator-abc123.vercel.app`
- Or a custom domain if you set one up

**Your app is now live!** 🎉

## Post-Deployment

### Update API Key Restrictions

Since you now have a new domain, update your Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your API key
3. Under **Application restrictions** → **HTTP referrers**
4. Add your new Vercel domain:
   ```
   https://your-app-name.vercel.app/*
   https://*.vercel.app/*
   ```
   (The second one covers all Vercel preview deployments)
5. Also keep your GitHub Pages domain if still using it:
   ```
   https://daniyal-rashid-00.github.io/*
   ```
6. Save changes

### Automatic Deployments

Every time you push to your GitHub repo:
- Vercel automatically detects the change
- Builds your app
- Deploys the new version
- Updates your live site

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain (if you have one)
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Make sure environment variable is set correctly
- Verify `package.json` has all dependencies

### API Key Not Working
- Double-check environment variable name: `VITE_GEMINI_API_KEY`
- Make sure it's enabled for Production
- Update API key restrictions in Google Cloud Console

### White Screen
- Check browser console for errors
- Verify the base path in `vite.config.js` (should be `'/'` for Vercel, not `/Email-Generator/`)

## Switching from GitHub Pages

If you're currently using GitHub Pages:

1. Deploy to Vercel (follow steps above)
2. Test your Vercel URL to make sure everything works
3. (Optional) Disable GitHub Pages in your repo settings
4. Update any links/bookmarks to use the new Vercel URL

## Benefits You'll Get

✅ **Private Repo Support** - Keep your code private (free!)
✅ **Faster Deployments** - Usually under 2 minutes
✅ **Better Performance** - Global CDN automatically
✅ **Preview Deployments** - Every PR gets a preview URL
✅ **Analytics** - Built-in analytics (optional)
✅ **No Configuration** - Works out of the box with Vite

That's it! Your app is now deployed on Vercel with private repo support! 🚀
