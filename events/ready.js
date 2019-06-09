module.exports = async () => {
  require('../handlers/presence')()
  require('../handlers/plugins')()
  require("../dashboard/server")()
  console.log('ready')
  console.log(Mike.plugins)
}
