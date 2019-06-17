const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: '⚙️ Developer',
  id: 'dev',
  description: 'Own it.',
  author: '214858075650260992',
  commands: commands,
  devOnly: true,
  hiddenInHelp: false
}
