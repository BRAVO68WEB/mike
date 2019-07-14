exports.output = async ({message}) => {
  const guild = await Mike.db.getGuild(message.guild.id)
  const commands = guild.plugins.customcmds ? guild.plugins.customcmds : []
  const names = commands.map(cmd => cmd.name)
  let descr = ``
  names.forEach(c => {
      descr += `\n• \`${c}\``
  })
  return Mike.models.snap({
    object: message,
    message: descr.length == 0 ? `\`[empty]\`` : descr,
  })
}
exports.data = {
  triggers: ['listcmds'],
  description: 'List all custom cmds for server.'
}
