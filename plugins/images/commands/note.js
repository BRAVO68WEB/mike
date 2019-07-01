exports.output = async ({message, args}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: `note?text=${encodeURIComponent(args.slice(0).join(' '))}`
  })
}

exports.data = {
    triggers: ['note'],
    description: 'Generates note image.',
    usage: [
      '{prefix}{command} <text>',
    ],
    args: [
      {
        type:'text',
        name:'text'
      }
    ]
}
