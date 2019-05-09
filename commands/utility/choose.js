exports.output = async ({message, args}) => {
    args = args.join(' ')
    if (!args.includes("|")) {
        return Mike.exec.error(message, `Please include more items.`)
    }
    args = args.split("|")
    return Mike.exec.snap(message, await Mike.utils.array.single(args))

}

exports.data = {
    triggers: ['choose'],
    description: 'Choose random item.',
    usage: [
        '{prefix}{command} <item>|<item>|[item]....',
    ],
    args: [
        {
            type:'any',
            name:'items'
        }
    ]
}
