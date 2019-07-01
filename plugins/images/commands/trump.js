exports.output = async ({message, args}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: `trump?text=${encodeURIComponent(args.slice(0).join(' '))}`
  })
}

exports.data = {
    triggers: ['trump'],
    description: 'Generates trump tweet image.',
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
