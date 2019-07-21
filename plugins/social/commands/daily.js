exports.output = async ({message}) => {
  const time = 86400000
  const user = await Mike.db.getUser(message.author.id)
  if (user.daily < Math.trunc(Date.now() - time)) {
    let bonus = 0
    let bonusMessage = ''
    let add = 0
    let bonusTotal = 0

    const coinCount = await Mike.utils.array.getCount(user.inventory, 'coin')
    if (coinCount > 0) {
      add = 5
      bonus += add
      bonusMessage += `+ \`${add}$\` for having \`${coinCount}\` ${Mike.customEmojis.coin}\n`
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

    const mikemoji = await Mike.guilds.get("340947847728070666")
    const isInMikemoji = await mikemoji.member(message.author.id)

    if (isInMikemoji) {
      add = 15
      bonus += add
      bonusMessage += `+ \`${add}$\` for being in [emoji](${Mike.links.mikemoji}) server\n`
      bonusTotal += 1
    }

    if (user.commands >= 500) {
      add = 120
      bonus += add
      bonusMessage += `+ \`${add}$\` for using Mike \`a lot\`\n`
      bonusTotal += 1
    }

    if (user.inventory.length >= 10) {
      add = 20
      bonus += add
      bonusMessage += `+ \`${add}$\` for having 10 or more items\n`
      bonusTotal += 1
    }

    if (user.rep >= 15) {
      add = 20
      bonus += add
      bonusMessage += `+ \`${add}$\` for having 15 or more reps\n`
      bonusTotal += 1
    }


    if (Mike.roles.developers.includes(message.author.id) || Mike.roles.contributors.includes(message.author.id)) {
      add = 100
      bonus += add
      bonusMessage += `+ \`${add}$\` for being contributor\n`
    }

    const received = Math.trunc(Math.random() * 200 + 100)

    await Mike.db.update('users', message.author.id, 'daily', Math.trunc(Date.now()))
    await Mike.db.addMoney(message.author.id, received+bonus)

    Mike.models.snap({
      object: message,
      message: `You received **${received}**$

                ${bonus > 0 ? `\`Bonuses:\` *(${bonusTotal}/7)*\n${bonusMessage}\nTotal: **${received+bonus}**$` : ``}
                `,
    })

  } else {
    const left = Math.abs((Date.now() - time - user.daily) / 1000)
    return Mike.models.snap({
      object: message,
      message: `\`You can use this command in ${Math.trunc(left / 60 / 60 % 24)} hours, ${Math.trunc(left / 60 % 60)} minutes and ${Math.trunc(left % 60)} seconds.\``,
      color: '#f44262'
    })
  }
}
exports.data = {
    triggers: ['daily'],
    description: 'Gives your daily cash.'
}
