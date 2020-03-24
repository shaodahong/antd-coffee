/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge')
const baseConf = require('./build/base')
const devConf = require('./build/dev')
const buildConf = require('./build/build')

const mode = process.env.NODE_ENV

module.exports = merge(baseConf, mode === 'development' ? devConf : buildConf, {
  mode,
})
