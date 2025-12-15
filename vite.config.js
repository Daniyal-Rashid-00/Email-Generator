import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to match your EXACT repository name!

  // Current setting assumes repo is named "Email-Generator"
  base: '/Email-Generator/',
  
  // Alternative: Use environment variable for flexibility
  // base: process.env.VITE_BASE_PATH || '/Email-Generator/',
})