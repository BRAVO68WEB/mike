const cowsay = require("cowsay")

exports.output = async ({message, args}) => {
  Mike.models.snap({
    object: message,
    message:`\`\`\`${cowsay.say({ text : args.join(" ") })}\`\`\``,
  })
}
exports.data = {
  triggers: ['cowsay'],
  description: 'Generate cowsay meme.',
  usage: [
    '{prefix}{command} <text>'
  ],
  args: [
    {
      'type':'any',
      'name':'text'
    }
  ]
}
