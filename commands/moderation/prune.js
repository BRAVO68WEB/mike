exports.output = async ({message, args}) => {
    async function purge() {
        if (args[0] < 1 || args[0] > 100) {
            return Mike.exec.error(message, 'Only positive numbers ranged from 1 - 100 are accepted!')
        }
        let fetched = await message.channel.fetchMessages({ limit: parseInt(args[0]) && parseInt(args[0]) < 100 ? parseInt(args[0]) : 100});
        let user;
        if (message.mentions.users.size) {
          user = message.mentions.users.first();
        }

        if (user) {
          fetched = fetched.filter(message => message.author.id === user.id);
        }

        if (args.includes(`--bots`)) {
          fetched = fetched.filter(message => message.author.bot);
        }

        let deleted = {}
        fetched.array().forEach(message => {
          if (deleted[message.author.tag] === undefined) {
            deleted[message.author.tag] = []
          }
          deleted[message.author.tag].push(message.id)
        })
        let who = ``
        Object.keys(deleted).forEach(user => {
          who += `${deleted[user].length} message${deleted[user].length == 1 ? `` : `s`} by ${user}\n`
        })
        try {
          await message.channel.bulkDelete(fetched);
        } catch(e) {
          return Mike.exec.error(message, `This messages are no longer deletable by bots.`).then(msg => { msg.delete(5000) });
        }
        Mike.exec.snap(message, `${message.author.tag} has deleted ${fetched.size} message${fetched.size == 1 ? `` : `s`}!\n\n${who}`)
    }
    return message.delete().then(() => { purge(); });
}
exports.data = {
    triggers: ['prune', 'purge', 'clear', 'clean', 'delete'],
    description: 'Prunes messages.',
    usage: [
        '{prefix}{command} <number>',
        '{prefix}{command} <number>',
        '{prefix}{command} <number> [--bots]',
        '{prefix}{command} <number> [mention]'
    ],
    args: [
      {
          'type':'int',
          'name':'number'
      },
    ],
    userPerms: [
        "MANAGE_MESSAGES"
    ],
    botPerms: [
        "MANAGE_MESSAGES"
    ]

}
