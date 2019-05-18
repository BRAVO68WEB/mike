exports.output = async ({message}) => {
    const roles = message.guild.roles.filter(r => r.position !== 0).map(r => `**${r.name}** - _${r.id}_`).map((r, i) => `${i + 1}. ${r}`);
    Mike.exec.snap(message, roles.join('\n'), false)
}
exports.data = {
    triggers: ['roles'],
    description: 'Shows all roles in guild.'
}