exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if(user.bot) return Mike.exec.error(message, 'Bots don\'t have levels.')
    const dbuser = await Mike.db.getUser(user.id)
    const dbguild= await Mike.db.getGuild(message.guild.id);
    const guilduser = dbguild.allusers[user.id] ? dbguild.allusers[user.id] : {lvl: 1, xp: 0, lvlnext: 80 }
    Mike.exec.mult(message, [
        ["Guild", message.guild.name,false],
        ["Level",`\`${guilduser.lvl}\``, true],
        ["Xp",`\`${guilduser.xp}\`/\`${guilduser.lvlnext}\``, true],
    ],
    ``, user.displayAvatarURL)

}
exports.data = {
    triggers: ['level', 'rank'],
    description: 'Shows user level.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
