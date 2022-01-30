import gulp from 'gulp'
import path from 'path'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'
import sassCompiler from 'node-sass'
import gulpSass from 'gulp-sass'
import SassAlias from 'sass-alias'
import postCSS from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postCSSImport from 'postcss-import'
import avifcss from 'gulp-avif-css'
import gulpIf from 'gulp-if'

import { isDev, isProd } from './_utils'
import { development, build } from './paths.json'

const sass = gulpSass(sassCompiler)

export const styles = () => (
  gulp.src(development.styles)
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass({
      cache: true,
      importer: new SassAlias({
        '@components': path.resolve(__dirname, '../src/components')
      }).getImporter()
    })
    .on('error', sass.logError))
    .pipe(replace('@images', '../assets/images'))
    .pipe(gulpIf(isProd, avifcss()))
    .pipe(postCSS([
      autoprefixer(),
      cssnano(),
      postCSSImport()
    ]))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest(build.styles))
)

export const stylesWatcher = () => gulp.watch(
  [
    `${development.ROOT}/styles/**/*.scss`,
    `${development.ROOT}/components/**/*.scss`
  ],
  styles
)
