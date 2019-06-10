const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: '📝 Message Logs',
  id: 'messlogs',
  description: 'Log what happens with messages!',
  author: '214858075650260992',
  commands: commands,
  devOnly: false,
  hidden: false,
  hiddenInDash: false,
  hiddenInHelp: false
}
