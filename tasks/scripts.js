import gulp from 'gulp'
import plumber from 'gulp-plumber'
import webpackStream from 'webpack-stream'
import named from 'vinyl-named'

import webpackConfig from '../webpack.config'
import { development, build } from './paths.json'

export const scripts = () => (
  gulp.src(development.scripts)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(build.scripts))
)

export const scriptsWatcher = () => gulp.watch(
  [
    `${development.ROOT}/scripts/**/*.js`,
    `${development.ROOT}/scripts/**/*.json`,
    `${development.ROOT}/components/**/*.js`,
    `${development.ROOT}/partials/**/*.js`
  ],
  scripts
)
