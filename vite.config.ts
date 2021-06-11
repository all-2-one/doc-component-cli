import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import markdownToVue from './src/markdown-to-vue/src/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    markdownToVue(),
    vue({ include: [/\.vue$/, /\.md$/, /\.vd$/] })
  ]
});
