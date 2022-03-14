'use strict'

const { join, basename } = require('path')

const { readFile } = require('../services/read')
const { writeFile } = require('../services/write')
const { transform } = require('../services/transformer')

module.exports = (path, options) => {
  console.log('TRANSFORM ...')

  const file = readFile(path)
  const transformedData = transform(options, file)

  const srcFileBaseName = basename(path).split('.')[0]
  const writeBase = options.w
  const writePath = join(writeBase, `${srcFileBaseName}_gct.txt`)

  console.log(`Writing file to: ${writePath}`)

  writeFile(writePath, transformedData)
}
