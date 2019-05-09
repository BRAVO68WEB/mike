exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `changemymind?text=${encodeURIComponent(args.slice(0).join(' '))}`, "image")
}
exports.data = {
    triggers: ['changemymind','cmm'],
    description: 'Generates change my mind image.',
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
