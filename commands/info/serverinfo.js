exports.output = async ({message, args}) => {
  const guild = Mike.guilds.get(args[0]) ? Mike.guilds.get(args[0]) : message.guild
  Mike.exec.mult(message, [
    ["ID", guild.id, true],
    ["Owner", guild.owner.user.tag, true],
    ["Region", guild.region.toTitleCase(), true],
    ["Roles", guild.roles.size - 1, true],
    ["Text Channels", guild.channels.filter(c => c.type === 'text').size, true],
    ["Voice Channels", guild.channels.filter(c => c.type === 'voice').size, true],
    ["Members", guild.members.filter(m => !m.user.bot).size, true],
    ["Bots", guild.members.filter(m => m.user.bot).size, true]
  ],
    `Created at: ${guild.createdAt.toUTCString()}`,
    guild.icon ? guild.iconURL : null,
    guild.splash ? guild.splashURL : null
  )
}
exports.data = {
    triggers: ['serverinfo'],
    description: 'Shows server info.',
    usage: [
        '{prefix}{command}',
        '{prefix}{command} [id]',
    ]
}
