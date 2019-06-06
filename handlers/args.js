module.exports = async (args, command, message) => {
  return new Promise(async (resolve, reject) => {
    const id = /^([0-9]{15,21})$/;
    const userMention = /<@!?([0-9]{15,21})>/
    const channelMention = /<#([0-9]{15,21})>/
    const roleMention = /<@&([0-9]{15,21})>/

    for (i = 0; i < command.data.args.length; i++) {
      if (command.data.args[i].type == 'mention' && !message.mentions.members.first()) {
        return error(message, `Wrong \`[${command.data.args[i].name}]\` argument\n\nIt needs to be \`[${command.data.args[i].type}]\`.`)
      }
    }
    resolve(false)

    function error(message, text) {
      Mike.models.snap({
        object: message,
        message: text,
        color: '#f44262'
      })
      resolve(true)
    }

  })

}
