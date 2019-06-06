exports.output = async ({message, args}) => {
  let evalTime
  try {
      const before = Date.now()
      const ret = eval(args.slice(0).join(' '))
      evalTime = Date.now() - before
      Mike.models.snap({
        object: message,
        message: `\`\`\`js\n${ret}\`\`\``,
        footer: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : ``
      })
  } catch (e) {
      Mike.models.snap({
        object: message,
        message: `\`\`\`js\n${e}\`\`\``,
        color: '#f44262'
      })
  }
}


exports.data = {
    triggers: ['eval'],
    description: 'Eval js code.',
    developer: true,
    usage: [
      '{prefix}{command} <code>'
    ],
    args: [
      {
        type: 'text',
        name: 'code'
      }
    ]
}
