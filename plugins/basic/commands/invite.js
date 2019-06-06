exports.output = async ({message}) => {
  Mike.models.snap({
    object: message,
    message: `[[Bot]](https://discordapp.com/oauth2/authorize?client_id=${Mike.user.id}&permissions=8&scope=bot)
              [[Support Server]](${Mike.links.guild})`,
  })
}

exports.data = {
    triggers: ['invite'],
    description: 'Sends invite links for bot and support server.'
}
