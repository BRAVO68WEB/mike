exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if (user.bot) {
      return Mike.models.snap({
        object: message,
        message: '\`Bots don\'t have pockets!\`',
        color: '#f44262'
      })
    }
    const dbuser = await Mike.db.getUser(user.id)
    let itemsValue = 0
    for (let i = 0; i < dbuser.inventory.length; i++) {
        item = Mike.items.filter(x => x.name === dbuser.inventory[i])
        itemsValue += item[0].worth
     }

    Mike.models.mult({
      object: message,
      fields: [
        ["Username",`\`${user.tag}\``, true],
        ["ID",`\`${user.id}\``, true],
        ["Level",`\`${await Mike.utils.social.getLevel(dbuser.xp)}\``, true],
        ["Next Level",`\`${(Mike.utils.social.getPoints(await Mike.utils.social.getLevel(dbuser.xp)+1)-dbuser.xp)}xp\``, true],
        ["Xp",`\`${dbuser.xp}\`/\`${Mike.utils.social.getPoints(await Mike.utils.social.getLevel(dbuser.xp)+1)}\``, true],
        ["Reputation",`\`${dbuser.rep}\``, true],
        ["Inventory",`\`${dbuser.inventory.length}\` items (\`${itemsValue}\`$)`, true],
        ["Money",`Bank: \`${dbuser.money}\`$\nPocket: \`${dbuser.pocket}\`$`, true]
      ],
      thumbnail: user.displayAvatarURL,
      footer: `${dbuser.commands} ${dbuser.commands > 1 ? `commands` : `command`} used.`
    })

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
