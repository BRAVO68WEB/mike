exports.output = async ({message, args}) => {
    let evalTime
    try {
        const before = Date.now()
        const ret = eval(args.slice(0).join(' '))
        evalTime = Date.now() - before
        return Mike.exec.snap(message,`\`\`\`js\n${ret}\`\`\``, false, null, null, evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : '')
    } catch (e) {
        return Mike.exec.snap(message,`\`\`\`js\n${e}\`\`\``, false)
    }
}
exports.data = {
    triggers: ['eval'],
    description: 'Evals code.',
    usage: [
        '{prefix}{command} <code>'
    ],
    args: [
            {
                'type':'any',
                'name':'code'
            }
    ],
    developer: true,
    cooldown: 0
}
