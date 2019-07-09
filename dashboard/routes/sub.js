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

}
