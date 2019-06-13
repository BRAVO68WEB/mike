const colors = require('colors/safe')

exports.warn = async (text) => {
  console.log(colors.bgYellow.black(`[⚠️] ${text}`))
}

exports.info = async (text) => {
  console.log(colors.bgCyan.black(`[❕] ${text}`))
}
