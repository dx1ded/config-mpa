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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      "@components": path.resolve(__dirname, 'src/components')
    }
  }
}
