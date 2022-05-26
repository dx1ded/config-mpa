import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'
import sassCompiler from 'sass'
import gulpSass from 'gulp-sass'
import SassAlias from 'sass-alias'
import postCSS from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sortMediaQueries from 'postcss-sort-media-queries'
import avifcss from 'gulp-avif-css'
import gulpIf from 'gulp-if'
import through from 'through2'

import { configure } from '@emitty/core'
import { parse } from 'emitty-language-sass-alias'

import { isDev, isProd } from './_utils'
import { development, build, alias } from './paths.json'

const emitty = configure()

emitty.language({
  extensions: ['.scss'],
  parser: parse.bind(this, alias)
})

const getFilter = () => (
  through.obj(function(file, _, callback) {
    emitty
      .filter(file.path, global.changedFile['styles'])
      .then((result) => {
        if (result) {
          this.push(file)
        }

        callback()
      })
  })
)

const sass = gulpSass(sassCompiler)

export const styles = () => (
  gulp.src(development.styles)
    .pipe(gulpIf(global.watch, getFilter()))
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules'],
      importer: new SassAlias(alias)
        .getImporter()
    })
    .on('error', sass.logError))
    .pipe(replace('@images', '../assets/images'))
    .pipe(replace('#/', '../assets/images/sprite.svg#'))
    .pipe(gulpIf(isProd, avifcss()))
    .pipe(postCSS([
      autoprefixer(),
      cssnano(),
      sortMediaQueries()
    ]))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest(build.styles))
)

export const stylesWatcher = () => gulp.watch(
  [
    `${development.ROOT}/styles/**/*.scss`,
    `${development.ROOT}/components/**/*.scss`,
    `${development.ROOT}/partials/**/*.scss`
  ],
  styles
).on('all', (_, filePath) => {
  global.changedFile['styles'] = filePath
})
