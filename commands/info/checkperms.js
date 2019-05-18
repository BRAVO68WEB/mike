exports.output = async ({message}) => {
  let fields = `Mike Perms in this guild:\n\n`;
  let permissions = message.guild.me.permissions.serialize();
  for (let permission in permissions) {
  fields += `${permissions[permission] ? `<:markYes:568830907666923525>` : `<:markNo:568830953938616330>`}\`${permission.replace(/_/g, ' ')}\`\n`
  };
  Mike.exec.snap(message,fields, false)
}
exports.data = {
    triggers: ['checkperms'],
    description: 'Shows bot perms in guild.'
}
