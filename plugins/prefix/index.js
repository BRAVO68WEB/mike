const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: '🖋 Prefix',
  id: 'prefix',
  description: 'Customize your server\'s prefix!',
  author: '214858075650260992',
  commands: commands,
  canBeDisabled: false,
  canBeHidden: false,
  devOnly: false,
  hidden: false
}
