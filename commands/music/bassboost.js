exports.output = async ({message, args}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }

    if (args[0] == 'easy') {
      await player.setEQ([
        {"band": 0, "gain": 2},
        {"band": 1, "gain": 4},
        {"band": 2, "gain": -4},
        {"band": 3, "gain": -2},
      ])
    } else if (args[0] == 'medium') {
      await player.setEQ([
        {"band": 0, "gain": 3},
        {"band": 1, "gain": 6},
        {"band": 2, "gain": -6},
        {"band": 3, "gain": -3},
      ])
    } else if (args[0] == 'hard') {
      await player.setEQ([
        {"band": 0, "gain": 4},
        {"band": 1, "gain": 8},
        {"band": 2, "gain": -8},
        {"band": 3, "gain": -4},
      ])
    } else {
      await player.setEQ([
        {"band": 0, "gain": 3},
        {"band": 1, "gain": 6},
        {"band": 2, "gain": -6},
        {"band": 3, "gain": -3},
      ])
    }

    return Mike.exec.snap(message, `Done!`)
};

exports.data = {
    triggers: ['bassboost'],
    description: 'Makes bassboost filter on.',
    voice: true,
    usage: [
        '{prefix}{command} [easy/hard/medium]',
    ]
}
