exports.output = async ({message, args}) => {
    await Mike.cacher.saveData('mike','lastStreamers', '{}')
    await Mike.cacher.saveData('mike','lastReddit', '{}')
    return Mike.exec.snap(message,`Done.`)
}
exports.data = {
    triggers: ['resetcache'],
    description: 'Resets cache.',
    usage: [
        '{prefix}{command}'
    ],
    developer: true,
    cooldown: 0
}
