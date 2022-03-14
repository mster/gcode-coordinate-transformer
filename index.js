#!/usr/bin/env node

'use strict'

const pkg = require('./package.json')
const { program } = require('commander')
const commands = require('./commands')

program.name(pkg.name).version(pkg.version)

const actionRunner = (args, fn) => {
  try {
    return fn(...args)
  } catch (error) {
    handleError(error)
  }
}

const handleError = error => {
  process.exitCode = 1337
  console.error(error)
}

program
  .command('run <readPath>')
  .option('-x <string>', 'X coordinate multiplier', 1)
  .option('-y <string>', 'Y coordinate multiplier', 1)
  .option('-z <string>', 'Z coordinate multiplier', 1)
  .option('-p <string>', 'Percision (decimal places)', 3)
  .option('-w <string>', 'write path', process.cwd())
  .action((...args) => actionRunner(args, commands.run))

program.parse(process.argv)
