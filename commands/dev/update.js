exports.output = async ({message, args}) => {
  const update = args.join(' ').split('|')
  let msg = ``
  if (update[0].split(';')[0] != '') {
    update[0].split(';').forEach(u => {
      msg += `${Mike.emoji.markYes} ${u}\n`
    })
  }
  if (update[1].split(';')[0] != '') {
    msg += `\n`
    update[1].split(';').forEach(u => {
      msg += `${Mike.emoji.markNeutral} ${u}\n`
    })
  }
  if (update[2].split(';')[0] != '') {
    msg += `\n`
    update[2].split(';').forEach(u => {
      msg += `${Mike.emoji.markNo} ${u}\n`
    })
  }
  message.delete()
  Mike.exec.snap(message, msg, false)
}
exports.data = {
    triggers: ['update'],
    description: 'Send update.',
    usage: [
        '{prefix}{command}'
    ],
    developer: true,
    cooldown: 0
}
