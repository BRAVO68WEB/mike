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

        message.channel.bulkDelete(fetched);
        Mike.exec.snap(message, `${message.author.username} has deleted ${fetched.size} message(s)!`).then(msg => { msg.delete(6000); });
    }
    return message.delete().then(() => { purge(); });
}
exports.data = {
    triggers: ['prune', 'purge', 'clear', 'clean', 'delete'],
    description: 'Prunes messages.',
    usage: [
        '{prefix}{command} [number]',
        '{prefix}{command} [number]',
        '{prefix}{command} [number] [--bots]',
        '{prefix}{command} [number] [mention]'
    ],
    userPerms: [
        "MANAGE_MESSAGES"
    ],
    botPerms: [
        "MANAGE_MESSAGES"
    ]

}
