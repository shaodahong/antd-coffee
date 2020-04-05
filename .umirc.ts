import { defineConfig } from 'dumi'
import path from 'path'

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'Ant Design Admin',
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
  outputPath: 'site',
  theme: {
    '@primary-color': '#912dbc',
  },
})
