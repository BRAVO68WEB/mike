exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.snap(message, `${user.tag} is ${await Mike.utils.users.stringtopercent(user.tag)}% gay.`)
}
exports.data = {
    triggers: ['howgay'],
    description: 'Shows gay % of user.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ],
    args: [
        {
            'type':'any',
            'name':'user'
        }
    ]
}
