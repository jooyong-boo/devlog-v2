import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/shared/config/test-setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/shared/lib/**/*.{ts,tsx}',
        'src/shared/ui/**/*.{ts,tsx}',
        'src/entities/post/**/*.{ts,tsx}',
        'src/entities/comment/ui/**/*.{ts,tsx}',
        'src/features/**/model/**/*.ts',
      ],
      exclude: [
        'node_modules/',
        '**/__tests__/**',
        '**/*.d.ts',
        '**/*.stories.*',
        '**/index.ts',
        'src/shared/config/**',
        'src/shared/types/**',
        'src/shared/lib/auth.ts',
        'src/shared/lib/prisma.ts',
        'src/shared/ui/providers/**',
        '**.config.**',
        '.next/',
        'out/',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
