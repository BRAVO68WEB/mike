const marked = require('marked')
const fs = require("fs")
module.exports = app => {
  app.get("/commands", async (req, res) => {

      let commands = {}

      Mike.plugins.forEach(plugin => {


        if (['nsfw','dev'].includes(plugin.id)) return

        commands[plugin.name.split(/[::]/)[2]] = []


        plugin.commands.forEach(command => {

          commands[plugin.name.split(/[::]/)[2]].push({
            name: command.data.triggers[0],
            description: command.data.description
          })

        })

      })

      renderTemplate(res, req, 'commands/main.ejs', {
        plugins: commands
    })
  })

  app.get("/customcmds", async (req, res) => {

      const md = function (filename) {
        const path = __dirname +"/../site/templates/docs/" + filename
        const include = fs.readFileSync(path, 'utf8')
        const html = marked(include)
        return html
      }

      renderTemplate(res, req, 'docs/customcmds.ejs', {
        md: md
    })
  })

}
