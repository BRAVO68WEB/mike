exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if(user.bot) return Mike.exec.error(message, 'Bots don\'t have profiles.')
    const dbUser = await Mike.db.getUser(user.id)
    if(dbUser.inventory.length == 0) return Mike.exec.error(message, 'Inventory is empty.')
    inventory = ''
    let count = {};
    dbUser.inventory.forEach(function(a) {
        count[a] = (count[a] || 0) + 1;
    });
    let keys = Object.keys(count);
    let values = Object.values(count)
    for (var i = 0; i < keys.length; i++) {
        item = Mike.items.filter(x => x.name === keys[i]);
        inventory += `\`${count[keys[i]]}x\`${item[0].emoji} `
      }

    Mike.exec.snap(message, inventory, false)
}
exports.data = {
    triggers: ['inventory','inv','items'],
    description: 'Shows inventory.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
