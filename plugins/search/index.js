const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: '🔍 Search',
  id: 'search',
  description: 'Search for eveything you want!',
  commands: commands,
  canBeDisabled: true,
  canBeHidden: true
}
