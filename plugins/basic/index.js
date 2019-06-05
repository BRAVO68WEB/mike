const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: '📚 Basic',
  id: 'basic',
  description: 'Get more informations about the bot!',
  author: '214858075650260992',
  commands: commands,
  canBeDisabled: false,
  canBeHidden: false
}
