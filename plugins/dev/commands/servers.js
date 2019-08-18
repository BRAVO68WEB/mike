exports.output = async ({message}) => {
  const servers = Mike.guilds.map(s => `${s.name} - \`${s.id}\``).join("\n")

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
