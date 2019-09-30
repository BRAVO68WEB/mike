exports.output = async ({message}) => {
  const permissions = message.guild.me.permissions.serialize()
  let perms = ``
  for (let permission in permissions) {
    perms += `${permissions[permission] ? Mike.customEmojis.markYes : Mike.customEmojis.markNo }\`${permission.replace(/_/g, ' ')}\`\n`
  }
  Mike.models.snap({
    object: message,
    message: `**${message.guild.name} - Mike perms**

              ${perms}`,
  })

}

exports.data = {
    triggers: ['perms'],
    description: 'Shows bot perms in server.'
}
