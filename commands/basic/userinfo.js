exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  const member = await message.guild.fetchMember(user);
  Mike.exec.mult(message, [
    ["Username", user.tag, true],
    ["Nick", user.nick ? user.nick : user.username, true],
    ["ID", user.id, true],
    ["Status", user.presence.status.replace(/online/g, "Online").replace(/idle/g, "Idle").replace(/dnd/g, "Do Not Disturb").replace(/offline/g, "Offline"), true],
    ["In", user.presence.game ? user.presence.game.name : "Nothing", true],
    ["Muted", member.serverMute ? `Yes` : `No`, true],
    ["Color", member.displayHexColor, true],
    ["Highest Role", member.highestRole.name.replace(/@everyone/g, '-'), true],
    ["Joined Guild", member.joinedAt.toUTCString(), true],
    ["Account Created", user.createdAt.toUTCString(), false]
  ],
    ``,
    user.displayAvatarURL
  )
}
exports.data = {
    triggers: ['userinfo'],
    description: 'Shows user info.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
