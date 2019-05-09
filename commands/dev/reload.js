const Managers = require('../../managers')

exports.output = async ({message, args}) => {
    for (const path in require.cache) {
        if (path.includes('v3')) {
           if (
               path.includes('commands') ||
               path.includes('database') ||
               path.includes('events') ||
               path.includes('files') ||
               path.includes('handlers') ||
               path.includes('music') ||
               path.includes('utils')
           ) {
             delete require.cache[path];
           }
       }
}
    Mike.managers.commandsloader = new Managers.CommandsLoader(Mike)
    return Mike.exec.snap(message,`Done.`)
}
exports.data = {
    triggers: ['reload'],
    description: 'Reloads commands.',
    developer: true,
    cooldown: 0
}
