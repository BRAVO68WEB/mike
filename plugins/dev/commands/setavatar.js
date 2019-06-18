exports.output = async ({message, args}) => {
  try {
      Mike.user.setAvatar(args.join(' '));
      Mike.models.snap({
        object: message,
        message: `Done.`,
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
  triggers: ['setavatar'],
  description: 'Changes bot avatar.',
  developer: true,
  usage: [
    '{prefix}{command} <link>'
  ],
  args: [
    {
      type: 'link',
      name: 'avatar'
    }
  ]
}
