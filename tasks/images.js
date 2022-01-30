import gulp from 'gulp'
import changed from 'gulp-changed'
import rename from 'gulp-rename'
import debug from 'gulp-debug'
import gulpIf from 'gulp-if'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'
import imageminAvif from 'imagemin-avif'

import { isProd } from './_utils'
import { development, build } from './paths.json'

const copyImages = () => (
  gulp.src(development.images.copy)
    .pipe(changed(build.images))
    .pipe(debug({ title: '[image]:' }))
    .pipe(gulpIf(isProd, imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      pngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: true }
        ]
      })
    ])))
    .pipe(gulp.dest(build.images))
)

const imagesToWebp = () => (
  gulp.src(development.images.generate)
    .pipe(changed(build.images, { extension: '.webp' }))
    .pipe(imagemin([
      imageminWebp({ quality: 70 })
    ]))
    .pipe(rename({ extname: '.webp' }))
    .pipe(debug({ title: '[image-webp]:' }))
    .pipe(gulp.dest(build.images))
)

const imagesToAvif = () => (
  gulp.src(development.images.generate)
    .pipe(changed(build.images, { extension: '.avif' }))
    .pipe(imagemin([
      imageminAvif({ quality: 70 })
    ]))
    .pipe(rename({ extname: '.avif' }))
    .pipe(debug({ title: '[image-avif]:' }))
    .pipe(gulp.dest(build.images))
)

const tasksToComplete = [copyImages]

if (isProd) {
  tasksToComplete.push(
    imagesToWebp,
    imagesToAvif
  )
}

export const images = gulp.series(...tasksToComplete)

export const imagesWatcher = () => gulp.watch(development.images.copy, images)
