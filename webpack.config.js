/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge')
const baseConf = require('./build/base')
const devConf = require('./build/dev')

module.exports = merge(baseConf, devConf, {
  mode: process.env.NODE_ENV,
})
