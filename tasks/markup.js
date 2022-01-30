import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import gulpIf from 'gulp-if'
import { setup as emittySetup } from '@zoxon/emitty'

import { isDev } from './_utils'
import { development, build } from './paths.json'
import config from '../project.config.json'

const emittyPug = emittySetup(development.ROOT, 'pug', {
  makeVinylFile: true
})

global.watch = false
global.emittyChangedFile = {
  path: '',
  stats: null
}

export const markup = () => (
  gulp.src(development.markup)
    .pipe(plumber())
    .pipe(gulpIf(
      global.watch,
      emittyPug.stream(
        global.emittyChangedFile.path,
        global.emittyChangedFile.stats
      )
    ))
    .pipe(pug({
      pretty: isDev,
      data: {
        isDev,
        config
      }
    }))
    .pipe(gulp.dest(build.markup))
)

export const markupWatcher = () => {
  global.watch = true

  gulp.watch(`${development.ROOT}/**/*.pug`, markup)
    .on('all', (_, filepath, stats) => {
      global.emittyChangeFile = {
        path: filepath,
        stats
      }
    })
}
