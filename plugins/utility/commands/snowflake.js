const { Snowflake } = require('discord.js');

exports.output = async ({message, args}) => {
  snowflake = Snowflake.deconstruct(args[0])
  if (!snowflake.timestamp || snowflake.timestamp < 1420070400001 || snowflake.timestamp > 3619093655551) return Mike.exec.error(message, "It's not a snowflake!")

  return Mike.models.snap({
    object: message, 
    message: `\n**Created at:** ${new Date(snowflake.timestamp).toUTCString()}\n**Worker ID:** ${snowflake.workerID}\n**Process ID:** ${snowflake.processID}\n**Increment ID:** ${snowflake.increment}`
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
