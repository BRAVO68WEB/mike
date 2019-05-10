exports.output = async ({message}) => {
    const msg = `
\`\`\`ldif
#Collected
Songs : ${Object.keys(Mike.stats.songs).length}
Games : ${Object.keys(Mike.stats.games).length}
#Events
Total : ${Mike.stats.events.total}
Errors : ${Mike.stats.events.errors}
Voice Updates : ${Mike.stats.events.voiceUpdates}
Reactions : ${Mike.stats.events.reactions}
#Messages
Total : ${Mike.stats.messages.total}
Updates : ${Mike.stats.messages.updates}
Deletions :  ${Mike.stats.messages.deletions}
#Music
Total Players: ${Mike.player.size}
Playing: ${Mike.player.filter(p=>p.playing).size}
\`\`\``
    Mike.exec.snap(message, msg, false)
}
exports.data = {
    triggers: ['debug'],
    description: 'Shows debug info',
    developer: true
}
