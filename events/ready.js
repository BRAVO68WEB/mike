module.exports = async () => {
  require('../handlers/presence')()
  require('../handlers/plugins')()
  require("../handlers/player").init()
  require("../dashboard/server")()
  console.log('ready')
  console.log(Mike.plugins)
}
