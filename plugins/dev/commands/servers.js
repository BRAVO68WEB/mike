exports.output = async ({message}) => {

  const servers = Mike.guilds.sort((a, b) => a.members.size - b.members.size)
                             .array()
                             .reverse()
                             .slice(0,10)
                             .map((server, i) => `**${i + 1}. **${server.name}\n\`[${server.members.size} members]\` |  \`${server.id}\``)
                             .join("\n")

  Mike.models.mult({
    object: message,
    fields: [
      ['Servers', servers, false]
    ],
  })

}

exports.data = {
    triggers: ['servers'],
    description: 'None',
    developer: true,
}
