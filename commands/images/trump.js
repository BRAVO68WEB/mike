exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `trump?text=${encodeURIComponent(args.slice(0).join(' '))}`, "image")
}
exports.data = {
    triggers: ['trump'],
    description: 'Generates trump tweet image.',
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
