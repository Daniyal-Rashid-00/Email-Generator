# Email Writer - AI-Powered Email Assistant

A beautiful, modern React application that helps you transform your raw thoughts into polished, professional emails using Google's Gemini AI.

## Features

- ✨ **AI-Powered Email Generation** - Uses Gemini 2.0 Flash to craft professional emails
- 🎨 **Beautiful UI/UX** - Modern design with blues, whites, and greys color palette
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

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

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

### Deploy to GitHub Pages

1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run `npm run deploy`

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Google Gemini API

## License

MIT
