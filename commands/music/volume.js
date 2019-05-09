exports.output = async ({message, args}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(args[0] > 200 || args[0] < 0) {
        return Mike.exec.error(message, 'Provide a number bewteen 1 - 200')
    }
    await player.volume(args[0]);
    return Mike.exec.snap(message,`Volume changed.`)
};

exports.data = {
    triggers: ['volume','v', 'vol'],
    description: 'Changes volume of current track.',
    voice: true,
    usage: [
        '{prefix}{command} <volume>'
    ],
    args: [
        {
            'type':'volume',
            'name':'volume'
        }
    ]
}
