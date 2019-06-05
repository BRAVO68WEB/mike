const fs = require('fs')

module.exports = async () => {
  Mike.plugins = []
  const plugins = fs.readdirSync(`${__dirname}/../plugins`)

  for (const pluginPath of plugins) {
    const plugin = require(`../plugins/${pluginPath}`)
    Mike.plugins.push(plugin)
  }
}
