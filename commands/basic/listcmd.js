exports.output = async ({message}) => {
    const guild = await Mike.db.getGuild(message.guild.id)
    const commands = guild.customcmds ? guild.customcmds : []
    const names = commands.map(cmd => cmd.name)
    let descr = ``
    names.forEach(c => {
        descr += `\n• \`${c}\``
    });
    Mike.exec.snap(message, descr.length == 0 ? `[empty]` : descr, false)
}
exports.data = {
    triggers: ['listcmds'],
    description: 'List all custom cmds for guild.'
}
