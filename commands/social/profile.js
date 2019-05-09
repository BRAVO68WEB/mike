exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if(user.bot) return Mike.exec.error(message, 'Bots don\'t have profiles.')
    const dbuser = await Mike.db.getUser(user.id)
    let itemsValue = 0
    for (var i = 0; i < dbuser.inventory.length; i++) {
        item = Mike.items.filter(x => x.name === dbuser.inventory[i]);
        itemsValue += item[0].worth
     }

    Mike.exec.mult(message, [
        ["Username",`\`${user.tag}\``, true],
        ["ID",`\`${user.id}\``, true],
        ["Level",`\`${await Mike.utils.users.getLevel(dbuser.xp)}\``, true],
        ["Next Level",`\`${(Mike.utils.users.getPoints(await Mike.utils.users.getLevel(dbuser.xp)+1)-dbuser.xp)}xp\``, true],
        ["Xp",`\`${dbuser.xp}\`/\`${Mike.utils.users.getPoints(await Mike.utils.users.getLevel(dbuser.xp)+1)}\``, true],
        ["Reputation",`\`${dbuser.rep}\``, true],
        ["Money",`Bank: \`${dbuser.money}\`$ | Pocket: \`${dbuser.pocket}\`$`, true],
        ["Inventory",`\`${dbuser.inventory.length}\` items (\`${itemsValue}\`$)`, true],
    ],
    `${dbuser.commands} ${dbuser.commands > 1 ? `commands` : `command`} used.`, user.displayAvatarURL)

}
exports.data = {
    triggers: ['profile'],
    description: 'Shows user profile.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
