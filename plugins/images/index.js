const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':frame_photo: Images',
  id: 'images',
  description: 'Get requested images from the internet or generate new!',
  author: '214858075650260992',
  commands: commands,
  devOnly: true,
  hiddenInHelp: false
}
