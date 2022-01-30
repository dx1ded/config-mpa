import gulp from 'gulp'

import { build } from './paths.json'

export const publicTask = () => (
  gulp.src([
    'public/**/*',
    '!public/assets/images/**/*',
    'public/.htaccess'
  ])
    .pipe(gulp.dest(build.ROOT))
)

export const publicWatcher = () => gulp.watch(
  ['public/**/*', '!public/assets/images'],
  publicTask
)
