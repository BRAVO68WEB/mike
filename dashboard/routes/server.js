module.exports = app => {

  app.get('/server/:id', async (req, res) => {

    renderTemplate(res, req, `server/index.html`)
  
  })
}
