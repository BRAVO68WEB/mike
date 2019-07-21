const { Snowflake } = require('discord.js')

exports.output = async ({message, args}) => {
  snowflake = Snowflake.deconstruct(args[0])
  if (!snowflake.timestamp || snowflake.timestamp < 1420070400001 || snowflake.timestamp > 3619093655551) {
    return Mike.models.snap({
      object: message,
      message: `\`It's not a snowflake!\``,
      color: '#f44262'
     })
   }

  return Mike.models.snap({
    object: message,
    message: `**Created at:** ${new Date(snowflake.timestamp).toUTCString()}
              **Worker ID:** ${snowflake.workerID}
              **Process ID:** ${snowflake.processID}
              **Increment ID:** ${snowflake.increment}`
  })
}
exports.data = {
  triggers: ['snowflake'],
  description: 'Shows snowflake info.',
  usage: [
    '{prefix}{command} <id>',
  ],
  args: [
    {
      'type':'text',
      'name':'id'
    }
  ]
}
