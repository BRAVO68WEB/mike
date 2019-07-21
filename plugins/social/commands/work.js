exports.output = async ({message}) => {
  const time = 10800000
  const user = await Mike.db.getUser(message.author.id)
  if (user.work < Math.trunc(Date.now() - time)) {
    let bonus = 0
    let bonusMessage = ''
    let add = 0
    let bonusTotal = 0

    const boxCount = await Mike.utils.array.getCount(user.inventory, 'box')
    if (boxCount > 0) {
      add = 5
      bonus += add
      bonusMessage += `+ \`${add}$\` for having \`${boxCount}\` ${Mike.customEmojis.box}\n`
      bonusTotal += 1
    }

    const support = await Mike.guilds.get("340947847728070666")
    const isInSupport = await support.member(message.author.id)

    if (isInSupport) {
      add = 30
      bonus += add
      bonusMessage += `+ \`${add}$\` for being in [support](${Mike.links.guild}) server\n`
      bonusTotal += 1
    }

    if (user.commands >= 500) {
      add = 10
      bonus += add
      bonusMessage += `+ \`${add}$\` for using Mike \`a lot\`\n`
      bonusTotal += 1
    }
    const received = Math.trunc(Math.random() * 30 + 80)

    await Mike.db.update('users', message.author.id, 'work', Math.trunc(Date.now()))
    await Mike.db.addMoney(message.author.id, received+bonus)

    Mike.models.snap({
      object: message,
      message: `You received **${received}**$

                ${bonus > 0 ? `\`Bonuses:\` *(${bonusTotal}/3)*\n${bonusMessage}\nTotal: **${received+bonus}**$` : ``}
                `,
    })

  } else {
    const left = Math.abs((Date.now() - time - user.work) / 1000)
    return Mike.models.snap({
      object: message,
      message: `\`You can use this command in ${Math.trunc(left / 60 / 60 % 24)} hours, ${Math.trunc(left / 60 % 60)} minutes and ${Math.trunc(left % 60)} seconds.\``,
      color: '#f44262'
    })
  }
}
exports.data = {
    triggers: ['work'],
    description: 'Gives your work cash.'
}
