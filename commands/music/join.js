exports.output = async ({message}) => {
    await Mike.player.join({
        guild: message.guild.id,
        channel: message.member.voiceChannel.id,
        host: Mike.config.lavalink.host
    }, { selfdeaf: true });
    return Mike.exec.snap(message,`Joined voice channel.`)
};

exports.data = {
    triggers: ['join'],
    description: 'Joins voice channel.',
    voice: true
}
