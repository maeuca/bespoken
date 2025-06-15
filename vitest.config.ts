import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true,
    setupFiles: './vitest.setup.ts', 
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html', 'lcov'], 
      include: ['src/components/**/*.{ts,tsx}'],  // ✅ only include components
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}']
    }
  }
})
