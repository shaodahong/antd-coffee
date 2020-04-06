import { defineConfig } from 'dumi'
import path from 'path'

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'Ant Design Admin',
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
  },
})
