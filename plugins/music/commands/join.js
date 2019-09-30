exports.output = async ({message}) => {
    
    await Mike.player.join({
        guild: message.guild.id,
        channel: message.member.voiceChannel.id,
        host: Mike.lavalink.host
    }, { selfdeaf: true })
    
    return Mike.models.snap({
      object: message,
      message: '\`Joined voice channel!\`',
    })
    
}

exports.data = {
    triggers: ['join'],
    description: 'Joins voice channel.',
    voice: true
}
