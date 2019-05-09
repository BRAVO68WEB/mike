exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `tweet?text=${encodeURIComponent(args.slice(0).join(' '))}&username=${encodeURIComponent(message.author.username)}&url=${encodeURIComponent(message.author.displayAvatarURL)}`, "image")
}
exports.data = {
    triggers: ['tweet'],
    description: 'Generates tweet image.',
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
