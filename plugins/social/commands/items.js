exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  if (user.bot) {
    return Mike.models.snap({
      object: message,
      message: '\`Bots don\'t have items!\`',
      color: '#f44262'
    })
  }
  const dbUser = await Mike.db.getUser(user.id)
  if (dbUser.inventory.length == 0) {
    return Mike.models.snap({
      object: message,
      message: '\`Inventory is empty.\`',
      color: '#f44262'
    })
  }

  inventory = ''
  let count = {}

  dbUser.inventory.forEach(item => {
    count[item] = (count[item] || 0) + 1
  })

  const keys = Object.keys(count);
  const values = Object.values(count)

  for (let i = 0; i < keys.length; i++) {
      item = Mike.items.filter(x => x.name === keys[i])
      inventory += `\`${count[keys[i]]}x\`${item[0].emoji} `
  }

  return Mike.models.snap({
    object: message,
    message: inventory
  })
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
