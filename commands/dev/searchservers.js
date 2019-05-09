exports.output = async ({message, args}) => {
  let guilds = Mike.guilds.filter(g => g.name.toLowerCase().includes(args.join(' ').toLowerCase())).map(g => `${g.name} - ${g.id}`);
  let total = guilds.length;
  guilds = total > 0 ? guilds.slice(0, 10).join('\n') : 'None';

    Mike.exec.snap(message, `Found ${total} server${total == 1 ? '' : 's'}\n\n${total > 10 ? `${guilds}\nand ${total - 10} more.` : guilds}`)
}
exports.data = {
    triggers: ['searchservers'],
    description: 'Search for text in servers',
    developer: true,
    usage: [
        '{prefix}{command} <text>',
    ],
    args: [
        {
            'type':'any',
            'name':'server'
        }
    ]
}
