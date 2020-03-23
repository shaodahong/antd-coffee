/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    hot: true,
    port: 9000,
  },
}
