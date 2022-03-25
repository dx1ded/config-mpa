import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import gulpIf from 'gulp-if'
import pugAlias from 'pug-alias'
import through from 'through2'
import typograf from 'gulp-typograf'

import { configure } from '@emitty/core'
import { parse } from 'emitty-pug-language-alias'

import { isDev, isProd } from './_utils'
import { development, build, alias } from './paths.json'
import config from '../project.config.json'

const emitty = configure()

emitty.language({
  extensions: ['.pug'],
  parser: parse.bind(this, alias)
})

const getFilter = () => (
  through.obj(function(file, _, callback) {
    emitty
      .filter(file.path, global.changedFile['markup'])
      .then((result) => {
        if (result) {
          this.push(file)
        }
        
        callback()
      })
  })
)

export const markup = () => (
  gulp.src(development.markup)
    .pipe(plumber())
    .pipe(gulpIf(global.watch, getFilter()))
    .pipe(pug({
      pretty: isDev,
      plugins: [pugAlias(alias)],
      data: { isDev, config }
    }))
    .pipe(gulpIf(isProd, typograf({ locale: ['ru', 'en-US'] })))
    .pipe(gulp.dest(build.markup))
)

export const markupWatcher = () => {
  gulp.watch(`${development.ROOT}/**/*.pug`, markup)
    .on('all', (_, filePath) => {
      global.changedFile['markup'] = filePath
    })
}
