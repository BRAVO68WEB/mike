
exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    await player.volume(100);
    await player.setEQ([
      {"band": 0, "gain": 0},
      {"band": 1, "gain": 0},
      {"band": 2, "gain": 0},
      {"band": 3, "gain": 0},
      {"band": 4, "gain": 0},
      {"band": 5, "gain": 0},
      {"band": 6, "gain": 0},
      {"band": 7, "gain": 0},
      {"band": 8, "gain": 0},
      {"band": 9, "gain": 0},

    ])
    return Mike.exec.snap(message, `Done!`)
};

exports.data = {
    triggers: ['normal'],
    description: 'Returns filter to normal mode.',
    voice: true
}
