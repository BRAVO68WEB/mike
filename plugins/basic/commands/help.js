exports.output = async ({message, args}) => {

  const plugin = Mike.plugins.find(plugin => plugin.id.includes(args[0]))
  if (plugin) {
    return Mike.models.snap({
      object: message,
      message: `**${plugin.name}**

                Description: \`${plugin.description}\`
                Author: \`${await Mike.users.get(plugin.author).tag}\`

                Can Be Disabled: \`${plugin.canBeDisabled ? `Yes` : 'No'}\`
                Can Be Hidden: \`${plugin.canBeHidden ? `Yes` : 'No'}\`
                
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
    description: 'Shows help message.'
}
