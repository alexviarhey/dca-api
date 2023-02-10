const fs = require('fs')
const toml = require('toml')


export const config = toml.parse(fs.readFileSync(__dirname + '/dev.toml', 'utf-8'));



