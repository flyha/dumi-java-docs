import { defineConfig } from 'dumi';
const repo = 'dumi-java-docs'; // 项目名

export default defineConfig({
  title: 'dumi-java-docs',
  mode: 'site',
  themeConfig: {
    name: 'dumi docs',
  },
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
});
