'use strict'

const { writeFileSync } = require('fs')

const writeFile = (path, data) => {
  if (!path) throw new Error('Error: cannot write file -- not path provided')
  if (!data) throw new Error('Error: cannot write file -- not data provided')

  const dataBuffer = Buffer.from(data)

  writeFileSync(path, dataBuffer)
}

module.exports = {
  writeFile
}
