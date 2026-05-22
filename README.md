# ✉️ IntroSpect: AI-Powered Email Assistant

**IntroSpect (Email Generator)** is a modern, production-ready React application designed to eliminate writer's block for professionals. By leveraging the OpenRouter API and LLMs (such as Gemini 2.0 Flash), it intelligently transforms raw thoughts or bullet points into polished, context-aware emails.

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/OpenRouter-AI-blue?style=for-the-badge" alt="OpenRouter">
</p>

---

## 🏗️ Architecture & Technical Highlights

This project demonstrates strong foundational front-end engineering principles, focusing on responsive design, state management, and seamless API integrations.

### 1. Modern React Architecture
- **Framework:** React 18 built with **Vite** for blazing fast HMR (Hot Module Replacement) and optimized production builds.
- **State Management:** Effectively manages complex UI state (theme toggling, multi-step generation contexts, loading states) using React Hooks.

### 2. 🎨 UI/UX & Responsive Design
- **Styling:** Styled utilizing **Tailwind CSS**. Built with clean utility classes ensuring zero dead code in the production CSS bundle.
- **Theming:** Implements full **Dark/Light Mode** support with CSS variables, allowing users to seamlessly toggle their preferred visual aesthetic.
- **Responsiveness:** fluidly adapts to mobile, tablet, and desktop screens. Mobile-first design principles ensure the application remains perfectly usable on small screens.

### 3. API Integration & Error Handling
- **LLM Integration:** Securely communicates with the OpenRouter.ai API to generate contextual responses.
- **Dynamic Prompting:** The frontend handles sophisticated string interpolation to dynamically adjust the AI prompt based on user-selected criteria (e.g., Tone: Professional, Casual, Persuasive) and the specific context of an email they might be replying to.
- **Graceful Failure:** Robust `try/catch` and user feedback blocks ensure that API timeouts or rate limits result in clean toast notifications rather than app crashes.

---

## 🛠️ Local Setup environment

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**

### Installation

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/YOUR_USERNAME/Email-Generator.git
cd Email-Generator
npm install
```

2. Set up environment variables:
   - Create a `.env` file in the root.
   - Add your OpenRouter API key:
     ```
     VITE_OPENROUTER_API_KEY=your_api_key_here
     ```

3. Start the development server:
```bash
npm run dev
```

Navigate to `http://localhost:5173`.

---

## 🚀 CI/CD & Deployment

This project is configured for extremely simple deployment pipelines:

- **Vercel:** Natively supported. Connect the GitHub repository and specify `npm run build` as the build command.
- **GitHub Actions / Pages:** A fully automated `deploy.yml` workflow (if configured) allows seamless deployment to GitHub Pages via Actions.

---

## 👨‍💻 About The Developer

Built by **Daniyal Rashid**, a focused software engineer with a passion for creating performant, user-centric web applications. 

🔗 **[View My Portfolio & Resume](https://daniyal-rashid.vercel.app/)**
