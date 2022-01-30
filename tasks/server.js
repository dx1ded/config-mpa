import browserSync from 'browser-sync'

import { build } from './paths.json'

export const server = (callback) => {
  browserSync.create().init({
    open: false,
    notify: false,
    ui: false,
    port: 3000,
    server: {
      baseDir: build.ROOT
    },
    files: [
      `${build.markup}/*.html`,
      `${build.styles}/*.css`,
      `${build.scripts}/*.js`,
      {
        match: `${build.ROOT}/assets/**/*`,
        fn() {
          this.reload()
        }
      }
    ]
  })

  /*
    I stumbled into an error connected with this callback.
    If i use default return like *export const server = () => (...)*
    ...i got an error that each task after this task ignores.
    So i'm enforced to use callback xd
  */

  callback()
}
