exports.output = async ({message, args}) => {
  const rate = await Mike.utils.number.random(1,9)
  const thing = message.mentions.members.first() || args.join(" ")
    Mike.models.snap({
      object: message,
      message: `${Mike.customEmojis.hype} **${thing}** rate\n${':star:'.repeat(rate)}${':eight_pointed_black_star:'.repeat(9-rate)}`,
    })
  }
exports.data = {
  triggers: ['rate'],
  description: 'Rates something.',
  usage: [
    '{prefix}{command} <text>'
  ],
  args: [
    {
      'type':'text',
      'name':'text'
    }
  ]
}
