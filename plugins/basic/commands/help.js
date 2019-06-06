exports.output = async ({message, args}) => {

  const plugin = Mike.plugins.find(plugin => plugin.id.includes(args[0]))
  if (plugin) {
    let commands = {
      normal:   [],
      voters:   [],
      donators: []
    }
    for (const command of plugin.commands) {
      if (command.data.voter) {
        commands.voters.push(`\`${command.data.triggers[0]}\``)
      } else if (command.data.donator) {
        commands.donators.push(`\`${command.data.triggers[0]}\``)
      } else {
        commands.normal.push(`\`${command.data.triggers[0]}\``)
      }
    }
    return Mike.models.snap({
      object: message,
      message: `**${plugin.name}**

                Description: \`${plugin.description}\`
                Author: \`${await Mike.users.get(plugin.author).tag}\`

                Can Be Disabled: \`${plugin.canBeDisabled ? `Yes` : 'No'}\`
                Can Be Hidden: \`${plugin.canBeHidden ? `Yes` : 'No'}\`

                Commands:
                ${commands.normal.join(', ')}

                ${commands.voters.length > 0 ? `Voters commands:\n` + commands.voters.join(', ') : ``}

                ${commands.donators.length > 0 ? `Donators commands:\n` + commands.donators.join(', ') : ``}
                `,
    })
  }

  let help = `Avalible Plugins:\n\n`
  await Mike.plugins.forEach(plugin => {
    help += `**${plugin.name}** (ID: *${plugin.id}*)
            \`${plugin.description}\`\n\n`
  })
  Mike.models.snap({
    object: message,
    message: help,
  })
}

exports.data = {
    triggers: ['help'],
    description: 'Shows help message.',
}
