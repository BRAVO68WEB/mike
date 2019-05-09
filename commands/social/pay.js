exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if(user.bot) return Mike.exec.error(message, 'Bots don\'t have pockets.')
    if(user.id == message.author.id) return Mike.exec.error(message, 'You cannot give yourself money.')
    await Mike.db.getUser(user.id)
    await Mike.db.addMoney(user.id, parseInt(args[1]))
    await Mike.db.subMoney(message.author.id, parseInt(args[1]))
    Mike.exec.snap(message, `Paid ${args[1]}$ to ${user.tag}`)
}
exports.data = {
    triggers: ['pay','share'],
    description: 'Pay someone.',
    usage: [
        '{prefix}{command} [mention] <money>',
        '{prefix}{command} [id] <money>',
        '{prefix}{command} [name] <money>'
    ],
    args: [
        {
            'type':'any',
            'name':'user'
        },
        {
            'type':'valid-pocket',
            'name':'money'
        }
    ]

}
