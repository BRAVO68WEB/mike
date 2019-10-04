const marked = require('marked')
const fs = require("fs")
module.exports = app => {

  app.get("/wip", async (req, res) => {

    renderTemplate(res, req, 'wip/index.html', {})

  })

  app.get("/team", async (req, res) => {

    renderTemplate(res, req, 'team/index.html', {})

  })

  app.get("/tags", async (req, res) => {

      const md = function (filename) {
        const path = __dirname +"/../site/templates/docs/" + filename
        const include = fs.readFileSync(path, 'utf8')
        const html = marked(include)
        return html
      }

      renderTemplate(res, req, 'docs/tags.ejs', {
        md: md
    })
    
  })

}
