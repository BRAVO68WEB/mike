exports.output = async ({message}) => {
  const channel = message.channel
  const messages = await channel.fetchMessages({ after: 1, limit: 1 });
  const msg = messages.first();
  const format = msg.author.avatar && msg.author.avatar.startsWith('a_') ? 'gif' : 'png';
  Mike.exec.mult(message, [
    ["Author", msg.author.tag, false],
    ["Content", msg.content, false],
    ["Jump", `[here](${msg.url})`, true]
  ],
    `ID: ${msg.id}`,
    msg.author.displayAvatarURL
  )
}
exports.data = {
    triggers: ['firstmessage'],
    description: 'Shows first message in channel.',
    botPerms: [
        "READ_MESSAGE_HISTORY"
    ]
}
