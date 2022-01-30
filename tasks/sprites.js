import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'

import { development, build } from './paths.json'

export const sprites = () => (
  gulp.src(development.sprites)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      },
      transform: [{svgo: {
        plugins: [
          { inlineStyles: { onlyMatchedOnce: false } }
        ]
      }}]
    }))
    .pipe(gulp.dest(build.sprites))
)

export const spritesWatcher = () => gulp.watch(development.sprites, sprites)
