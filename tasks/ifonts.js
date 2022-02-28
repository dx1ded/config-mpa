const fs = require('fs')
const { development } = require('./paths.json')

const includeFonts = () => {
  const files = fs.readdirSync('public/assets/fonts')
  const fileNames = files.map(file => file.split('.')[0])
  const uniqueArray = new Set(fileNames)

  const appendFile = (data) => {
    fs.appendFileSync(
      `${development.ROOT}/styles/_fonts.scss`,
      data
    )
  }

  fs.writeFileSync(`${development.ROOT}/styles/_fonts.scss`, '')

  uniqueArray.forEach((file, index) => {
    appendFile(`@include font("${file}", "../assets/fonts/${file}", 400, normal);\n`)

    if (index + 1 === uniqueArray.length) {
      appendFile('')
    }
  })

  console.log('[fonts]: included')
}

includeFonts()
