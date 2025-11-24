import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repoName = 'luxedate'

export default defineConfig({
  // When running on GitHub Actions, set base to the project name so
  // assets are served correctly from https://<user>.github.io/<repo>/
  base: process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/',
  plugins: [react()],
})
