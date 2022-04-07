const path = require('path')

import { isDev } from './tasks/_utils'

export default {
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'inline-source-map' : false,
  cache: isDev,
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@cmps': path.resolve(__dirname, 'src/components')
    }
  }
}
