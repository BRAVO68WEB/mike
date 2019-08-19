exports.output = async ({message}) => {
    const roles = message.guild.roles.filter(r => r.position !== 0).map(r => `**${r.name}** - _${r.id}_`).map((r, i) => `${i + 1}. ${r}`)
    Mike.models.snap({
      object: message,
      message: `**${message.guild.name} - roles**\n${roles.join('\n')}`
    })
}
exports.data = {
  triggers: ['roles'],
  description: 'Shows all roles in guild.'
}
