# API Key Security Setup Guide

## Why Restrict Your API Key?

**Yes, restricting your API key to your website is the right approach!** Here's why:

✅ **Security**: Even though the API key is visible in your client-side code, it will **only work** when requests come from your allowed domains  
✅ **Cost Protection**: Prevents others from using your API key on their websites  
✅ **Rate Limit Protection**: Stops unauthorized usage that could hit your rate limits  

**Important Note**: The API key will still be visible in the browser's source code, but Google will **reject** any requests that don't come from your whitelisted domains.

## Step-by-Step: Restrict API Key to Your Website

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/credentials
2. Sign in with your Google account
3. Select your project (or create one if you haven't)

### Step 2: Find Your API Key
1. Look for your API key (`VITE_GEMINI_API_KEY`) in the credentials list
2. Click on the key name to edit it

### Step 3: Set Application Restrictions
1. Under **"Application restrictions"**, select **"HTTP referrers (web sites)"**
2. Click **"Add an item"** and add these referrers one by one:

   **For Production (Your Live Site):**
   ```
   https://daniyal-rashid-00.github.io/*
   https://daniyal-rashid-00.github.io/Email-Generator/*
   ```

   **For Local Development (Optional but Recommended):**
   ```
   http://localhost:*
   http://127.0.0.1:*
   http://localhost:5173/*
   ```

3. **Important**: Make sure to include the `/*` at the end - this allows all paths on your domain

### Step 4: Set API Restrictions
1. Under **"API restrictions"**, select **"Restrict key"**
2. Check the box for **"Generative Language API"** (or "Vertex AI API")
3. Click **"Save"**

### Step 5: Enable the API (If Not Already Done)
1. Go to: https://console.cloud.google.com/apis/library
2. Search for **"Generative Language API"**
3. Click on it and click **"Enable"**
4. Wait a few minutes for it to activate

### Step 4: Configure API Restrictions
1. Under **API restrictions**, select **"Restrict key"**
2. Select **"Generative Language API"** (or "Vertex AI API" if that's what you're using)
3. Click **Save**

### Step 5: Enable the API
1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Generative Language API" or "Gemini API"
3. Click on it and click **"Enable"**

### Step 6: Verify Your API Key
- Make sure the API key value matches what you have in GitHub Secrets
- The key should start with `AIza...`

## Do You Still Need GitHub Secrets?

**Yes, you absolutely still need GitHub Secrets!** Here's why:

### Why GitHub Secrets Are Still Required:

1. **Build Process**: During the GitHub Actions build, Vite needs the API key to embed it into your JavaScript bundle
2. **Security**: Keeps the API key out of your source code repository
3. **Environment Variables**: The key is injected as `VITE_GEMINI_API_KEY` during the build

### How It Works:

```
GitHub Secret (VITE_GEMINI_API_KEY)
    ↓
GitHub Actions Build Process
    ↓
Injected into JavaScript bundle
    ↓
Deployed to GitHub Pages
    ↓
Visible in browser, but ONLY works from your whitelisted domains
```

### Setting Up GitHub Secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `VITE_GEMINI_API_KEY`
5. Value: Your API key (the same one you restricted in Google Cloud Console)
6. Click **"Add secret"**

**Important**: The API key in GitHub Secrets should be the **same key** you configured in Google Cloud Console with domain restrictions.

## How Security Works

Here's the complete security flow:

1. ✅ **API Key in GitHub Secrets** → Not visible in your code repository
2. ✅ **Domain Restrictions in Google Cloud** → Key only works from your domain
3. ✅ **Visible in Browser** → But Google rejects requests from other domains
4. ✅ **Result**: Others can see the key, but **cannot use it** on their websites

## Testing Your Setup

After configuring everything:

1. **Wait 2-3 minutes** for Google Cloud changes to propagate
2. **Rebuild your site** (push a new commit or manually trigger GitHub Actions)
3. **Test on your live site**: https://daniyal-rashid-00.github.io/Email-Generator/
4. **Test locally**: Run `npm run dev` and test on localhost

### If You Still Get 403 Errors:

1. ✅ Verify the referrer URLs in Google Cloud Console match exactly (including `/*`)
2. ✅ Check that "Generative Language API" is enabled
3. ✅ Wait a few more minutes for changes to propagate
4. ✅ Check browser console for detailed error messages
5. ✅ Verify the API key in GitHub Secrets matches the one in Google Cloud Console

## Alternative: Create a New API Key

If your current key is blocked or you want a fresh start:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **"Create Credentials"** → **"API Key"**
3. Configure restrictions as described above
4. Update the `VITE_GEMINI_API_KEY` secret in GitHub with the new key

## Best Practices

- ✅ **Monitor Usage**: Check Google Cloud Console regularly for API usage
- ✅ **Set Billing Alerts**: Avoid unexpected charges
- ✅ **Rate Limiting**: Consider implementing client-side rate limiting
- ✅ **Keep Secrets Updated**: If you rotate your API key, update both Google Cloud and GitHub Secrets
