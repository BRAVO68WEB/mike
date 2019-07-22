const Collector = require('../utils/collector.js')

module.exports = async () => {
  require('../handlers/presence')()
  require('../handlers/plugins')()
  require("../handlers/player").init()
  require("../dashboard/server")()
  Mike.Collector = new Collector(Mike)
  Mike.console.info('Mike is ready.')
}
