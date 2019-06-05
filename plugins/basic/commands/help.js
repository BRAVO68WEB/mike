exports.output = async ({message, args}) => {
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
