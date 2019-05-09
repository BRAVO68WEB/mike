exports.output = async ({message, args}) => {
    await Mike.db.transferBank(message.author.id, parseInt(args[0]))
    Mike.exec.snap(message, `Deposited ${args[0]}$ to bank.`)
}
exports.data = {
    triggers: ['deposit'],
    description: 'Deposit pocket money to bank.',
    usage: [
        '{prefix}{command} <money>',
    ],
    args: [
        {
            'type':'valid-pocket',
            'name':'money'
        }
    ]

}
