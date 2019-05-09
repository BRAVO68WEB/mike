exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }

    await player.setEQ([
      {"band": 0, "gain": 4},
      {"band": 1, "gain": 8},
      {"band": 2, "gain": -8},
      {"band": 3, "gain": -4},
    ])
    return Mike.exec.snap(message, `Done!`)
};

exports.data = {
    triggers: ['bassboost'],
    description: 'Makes bassboost filter on.',
    voice: true
}
