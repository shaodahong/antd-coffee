import { defineConfig } from 'dumi'
import path from 'path'

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'Ant Design Admin',
  logo: '/logo.png',
  favicon: '/favicon.ico',
  outputPath: 'site',
  resolve: {
    includes: ['components'],
  },
  alias: {
    'ant-design-admin': path.resolve(__dirname, './components'),
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'ant-design-admin',
        libraryDirectory: '',
        style: true,
      },
    ],
  ],
  theme: {
    '@primary-color': '#912dbc',
    // '@c-primary': '#912dbc',
    // '@c-heading': '#912dbc',
    // '@c-text': '#912dbc',
    // '@c-secondary': '#717484',
    // '@c-link': '@c-primary',
    // '@c-border': '#ebedf1',
    // '@c-light-bg': '#f9fafb',
  },
})
