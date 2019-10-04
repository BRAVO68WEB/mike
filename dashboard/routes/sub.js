const marked = require('marked')
const fs = require("fs")
module.exports = app => {
  // app.get("/commands", async (req, res) => {

  //     let plugins = {}

  //     Mike.plugins.forEach(plugin => {


  //       if (['nsfw','dev'].includes(plugin.id)) return

  //       plugins[plugin.id] = {
  //         commands: {},
  //         name: plugin.name.split(/[::]/)[2]
  //       }

  //       plugins[plugin.id].commands = []


  //       plugin.commands.forEach(command => {

  //         plugins[plugin.id].commands.push({
  //           name: command.data.triggers[0],
  //           description: command.data.description
  //         })

  //       })

  //     })
  //     renderTemplate(res, req, 'commands/index.html', {
  //       plugins: plugins
  //   })

  // })


  app.get("/wip", async (req, res) => {

    renderTemplate(res, req, 'wip/index.html', {})

  })

  app.get("/commands", async (req, res) => {

    renderTemplate(res, req, 'wip/index.html', {})

  })

  app.get("/terms", async (req, res) => {

    renderTemplate(res, req, 'wip/index.html', {})

  })

  app.get("/privacy", async (req, res) => {

    renderTemplate(res, req, 'wip/index.html', {})

  })

  app.get("/faq", async (req, res) => {

    renderTemplate(res, req, 'wip/index.html', {})

  })

  app.get("/team", async (req, res) => {

    renderTemplate(res, req, 'team/index.html', {})

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
