exports.output = async ({message, args}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: `changemymind?text=${encodeURIComponent(args.slice(0).join(' '))}`
  })
}

exports.data = {
    triggers: ['changemymind','cmm'],
    description: 'Generates change my mind image.',
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
