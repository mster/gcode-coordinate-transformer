'use strict'

const DESIGS = ['X', 'Y', 'Z']

const transform = (options, file) => {
  const places = parseInt(options.p)
  const percision = Math.pow(10, places)

  // split file by line
  const splitFile = file.split('\n')

  return splitFile.map(line => {
    // non-coordinate line
    if (line[0] !== 'G') return line

    // coordinate line
    const rawTransformedCoords = []
    const split = line.split(' ')
    split.forEach(value => {
      const desig = value[0]
      if (DESIGS.includes(desig)) {
        // do transform
        const desigValue = value.slice(1)
        const desigNum = parseFloat(desigValue)
        const mapNum = parseFloat(options[desig.toLowerCase()])

        // consider tolerences
        const transformedNumber = desigNum * mapNum
        const transformedFixedNumber = Math.round(transformedNumber * percision) / percision

        const [whole, decimal] = `${transformedFixedNumber}`.split('.')
        const decimalLength = `${decimal}`.length
        if (decimalLength < places) {
          const formmatedDecimal = `${decimal}${'0'.repeat(places - decimalLength)}`
          const transformedCoord = `${desig}${whole}.${formmatedDecimal}`

          rawTransformedCoords.push(transformedCoord)
        }

        // add desig
        const transformedCoord = `${desig}${transformedFixedNumber}`
        rawTransformedCoords.push(transformedCoord)
      } else {
        // ignore
        rawTransformedCoords.push(value)
      }
    })
    const transformedCoordinates = rawTransformedCoords.join(' ')
    return transformedCoordinates
  }).join('\n').trim()
}

module.exports = {
  transform
}
