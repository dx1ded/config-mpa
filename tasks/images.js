import gulp from 'gulp'
import path from 'path'
import changed from 'gulp-changed'
import debug from 'gulp-debug'
import gulpIf from 'gulp-if'
import squoosh from 'gulp-squoosh'

import { isProd } from './_utils'
import { development, build } from './paths.json'

export const images = () => (
  gulp.src(development.images.copy)
    .pipe(changed(build.images))
    .pipe(debug({ title: '[image]:' }))
    .pipe(gulpIf(
      isProd,
      squoosh(({ filePath }) => ({
        encodeOptions: {
          webp: { quality: 80 },
          avif: { quality: 80 },
          ...(path.extname(filePath) === 'png'
            ? { oxipng: { level: 2 } }
            : { mozjpeg: { level: 2 } })
        }
      }))
    ))
    .pipe(gulp.dest(build.images))
)

export const imagesWatcher = () => gulp.watch(development.images.copy, images)
