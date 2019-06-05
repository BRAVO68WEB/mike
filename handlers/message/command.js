module.exports = async (message, messagePrefix) => {
  let [commandName, ...args] = message.content.slice(messagePrefix.length).split(/ +/g)

  args = await require('../args')(args, message)
}
