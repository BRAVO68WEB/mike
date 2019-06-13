module.exports = async () => {
  require('../handlers/presence')()
  require('../handlers/plugins')()
  require("../handlers/player").init()
  require("../dashboard/server")()
  Mike.console.info('Mike is ready.')
}
