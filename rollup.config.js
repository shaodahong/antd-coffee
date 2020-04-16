import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
// eslint-disable-next-line import/no-extraneous-dependencies
import reactIS from 'react-is'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import replace from '@rollup/plugin-replace'

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  antd: 'antd',
}

export default {
  input: 'components/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'AntdCoffee',
      globals,
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'AntdCoffee',
      plugins: [terser()],
      globals,
    },
  ],
  external: Object.keys(globals),
  plugins: [
    babel({
      exclude: 'node_modules/**',
      configFile: './.babelrc.js',
    }),
    resolve(),
    typescript(),
    commonjs({
      ignoreGlobal: true,
      include: /node_modules/,
      namedExports: {
        'react-is': Object.keys(reactIS),
      },
    }),
    visualizer(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
}
