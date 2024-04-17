import { defineConfig } from 'dumi';
const repo = 'saas'; // 项目名

export default defineConfig({
  title: 'dumi-java-docs',
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  exportStatic: {},
  logo: '/saas/MSH-logo.jpg',
  // favicon: '/public/saas/favicon.ico',
  themeConfig: {
    name: 'dumi docs',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],
});
