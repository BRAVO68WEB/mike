module.exports = async () => {
  require('../handlers/presence')()
  require('../handlers/plugins')()
  console.log('ready')
  console.log(Mike.plugins)
}
