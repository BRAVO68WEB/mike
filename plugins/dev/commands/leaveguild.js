exports.output = async ({message, args}) => {
  Mike.guilds.get(args[0]).leave()

  Mike.models.snap({
    object: message,
    message: `Done.`,
  })

}

exports.data = {
  triggers: ['leaveguild'],
  description: 'Leaves Guild.',
  usage: [
      '{prefix}{command} <id>'
  ],
  args: [
    {
      type: 'id',
      name: 'id'
    }
  ],
  developer: true,
}
