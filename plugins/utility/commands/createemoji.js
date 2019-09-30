const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/

exports.output = async ({message, args}) => {
  
  if (!regex.test(args[1])) {
    return Mike.models.snap({
      object: message,
      message: '\`Enter valid URL.\`',
      color: '#f44262'
    })
  }
    
  if (message.guild.emojis.filter(e => e.name == args[0]).size == 1) {
    return Mike.models.snap({
        object: message,
        message: '\`Emoji already exist.\`',
        color: '#f44262'
    })
  }

  if (args[1].match(/\.(jpeg|jpg|gif|png)$/)) {
    message.guild.createEmoji(args[1], args[0]).then(async emoji => {
        return Mike.models.snap({
            object: message,
            message: '\`Emoji created.\`',
        })
    })
  } else {
    return Mike.models.snap({
      object: message,
      message: '\`Enter valid URL.\`',
      color: '#f44262'
    })
  }

}

exports.data = {
  triggers: ['createemoji'],
  description: 'Creates emoji from link',
  usage: [
    '{prefix}{command} <name> <image link>',
  ],
  args: [
    {
      'type': 'text',
      'name': 'name'
    },
    {
      'type': 'link',
      'name': 'link'
    }
  ],
  userPerms: [
    "MANAGE_EMOJIS"
  ],
  botPerms: [
    "MANAGE_EMOJIS"
  ]
}
