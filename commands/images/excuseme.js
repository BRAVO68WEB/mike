exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `excuseme?text=${encodeURIComponent(args.slice(0).join(' '))}`, "image")
}
exports.data = {
    triggers: ['excuseme'],
    description: 'Generates excuse me image.',
    usage: [
        '{prefix}{command} <text>',
    ],
    args: [
        {
            type:'any',
            name:'text'
        }
    ],
    cooldown: 10
}
