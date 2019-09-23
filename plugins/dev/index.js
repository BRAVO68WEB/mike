const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':lock: Developer',
  id: 'dev',
  description: 'Own it.',
  author: 'Badosz#0001',
  commands: commands,
  devOnly: true,
  hiddenInHelp: false
}
