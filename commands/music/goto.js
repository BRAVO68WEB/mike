exports.output = async ({message, args}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }

    await player.seek(parseInt(await Mike.utils.time.toseconds(args[0]))*1000)
    return Mike.exec.snap(message, `Done!`)
};

exports.data = {
    triggers: ['goto','seek'],
    description: 'Goes to given time.',
    voice: true,
    usage: [
        '{prefix}{command} <S>',
        '{prefix}{command} <M:S>',
        '{prefix}{command} <H:M:S>',
    ],
    args: [
        {
            'type':'any',
            'name':'time'
        }
    ],
    voter: true
}
