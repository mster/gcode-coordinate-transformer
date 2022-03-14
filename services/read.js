'use strict'

const { readFileSync } = require('fs')

const readFile = (path) => {
  if (!path) throw new Error('Error: cannot read file -- not path provided')

  const file = readFileSync(path)
  return file.toString()
}

module.exports = {
  readFile
}
