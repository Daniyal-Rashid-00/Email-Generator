# Email Writer - AI-Powered Email Assistant

A beautiful, modern React application that helps you transform your raw thoughts into polished, professional emails using AI.

## Features

- ✨ **AI-Powered Email Generation** - Uses OpenRouter.ai with free Gemini models to craft professional emails
- 🎨 **Beautiful UI/UX** - Modern design with blues, whites, and greys color palette
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Mobile Responsive** - Fully optimized for all screen sizes
- 🎭 **Multiple Tones** - Choose from Professional, Warm, Concise, Formal, Casual, or Persuasive
- 📧 **Context Support** - Optionally include the email you're responding to for better context
- 📋 **Copy to Clipboard** - One-click copy functionality for generated emails
- ⚡ **Fast & Responsive** - Built with Vite for optimal performance

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your OpenRouter API key:
     ```
     VITE_OPENROUTER_API_KEY=your_api_key_here
     ```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to GitHub Pages or Vercel.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Vite and configure the build settings
4. Deploy!

### Deploy to GitHub Pages (No Local Installation Required!)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

2. Set up GitHub Secrets (for API key security):
   - Go to your repository **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: Your OpenRouter API key (get it from https://openrouter.ai/keys)
   - Click **Add secret**

3. Enable GitHub Pages:
   - Go to your repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

4. That's it! GitHub Actions will automatically build and deploy your app.

   Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

   See `DEPLOYMENT.md` for detailed instructions.

## Environment Variables

The app uses environment variables to securely store the OpenRouter API key:

- `VITE_OPENROUTER_API_KEY` - Your OpenRouter.ai API key (get it from https://openrouter.ai/keys)

**Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

For GitHub Pages deployment, add `VITE_OPENROUTER_API_KEY` as a GitHub Secret (see Deployment section).

**Note:** OpenRouter provides free access to various AI models. The app uses `google/gemini-2.0-flash-exp:free` by default.

## Technologies Used

- React 18
- Vite
- Tailwind CSS (with Dark Mode support)
- Lucide React (Icons)
- OpenRouter.ai API (with free Gemini models)

## License

MIT
