const toml = require('toml')
const fs = require('fs')

export const config = toml.parse(fs.readFileSync(__dirname + '/dev.toml', 'utf-8'));
