const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: '📚 Basic',
  description: 'Get more informations about the bot!',
  commands: commands,
  canBeDisabled: false,
  canBeHidden: false
}
