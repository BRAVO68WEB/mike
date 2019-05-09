exports.output = async ({message, args}) => {
    await Mike.db.transferPocket(message.author.id, parseInt(args[0]))
    Mike.exec.snap(message, `Withdrawn ${args[0]}$ to pocket.`)
}
exports.data = {
    triggers: ['withdraw'],
    description: 'Withdraw money to pocket.',
    usage: [
        '{prefix}{command} <money>',
    ],
    args: [
        {
            'type':'valid-bank',
            'name':'money'
        }
    ]

}
