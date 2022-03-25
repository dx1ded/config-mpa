const fs = require('fs')
const del = require('del')

const { development, build } = require('./paths.json')

const pageMarkup = `extends layouts/page
include _mixins

block config
  - page.title = "Page Title"

block styles
  +style("styles/index.css")

block partials
  | Index Page

block scripts
  +script("scripts/index.js")
`

;(() => {
  // Remove distribution folder
  del.sync(build.ROOT)
  // Remove components
  del.sync([`${development.ROOT}/components/**/*`, `!${development.ROOT}/components/Head`])
  // Remove partials
  del.sync(`${development.ROOT}/partials/*`)
  // Remove scripts
  del.sync([
    `${development.ROOT}/scripts/**/*.js`,
    `!${development.ROOT}/scripts/_defaults/*.js`
  ])
  // Remove styles components
  del.sync(`${development.ROOT}/styles/typography/*.scss`)
  // Remove styles pages
  del.sync(`${development.ROOT}/styles/pages/*.scss`)
  // Clear _animations.scss
  fs.writeFileSync(`${development.ROOT}/styles/_animations.scss`, '')
  // Clear _fonts.scss
  fs.writeFileSync(`${development.ROOT}/styles/_fonts.scss`, '')
  // Remove Pages
  del.sync(development.markup)
  // Write default page (index.pug)
  fs.writeFileSync(`${development.ROOT}/index.pug`, pageMarkup)
  // Remove Images
  del.sync([...development.images.copy, '!public/assets/images/_placeholder.png'])
  // Remove Sprites
  del.sync(development.sprites)
  // Create svg folder
  fs.mkdirSync('public/assets/images/svg')
  // Remove Fonts
  del.sync('public/assets/fonts/**/*')

  console.log('[clear]: Success')
})()
