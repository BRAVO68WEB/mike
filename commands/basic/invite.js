exports.output = async ({message}) => {
    Mike.exec.snap(message, `[[Bot]](https://discordapp.com/oauth2/authorize?client_id=419620594645073930&permissions=8&scope=bot) [[Community]](https://discord.gg/hfGSb8y)`, false)
}
exports.data = {
    triggers: ['invite'],
    description: 'Shows invite links.'
}