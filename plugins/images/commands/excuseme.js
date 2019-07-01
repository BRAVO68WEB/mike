exports.output = async ({message, args}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: `excuseme?text=${encodeURIComponent(args.slice(0).join(' '))}`
  })
}

exports.data = {
    triggers: ['excuseme'],
    description: 'Generates excuse me image.',
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
