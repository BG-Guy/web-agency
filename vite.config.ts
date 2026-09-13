import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // Served at https://bg-guy.github.io/web-agency/ — assets need the repo-name subpath.
  base: command === 'build' ? '/web-agency/' : '/',
  plugins: [tailwindcss()],
}))
