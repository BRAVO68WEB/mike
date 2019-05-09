exports.output = async ({message}) => {
    const outcomes = [
        'It\'s decidedly so',
        'Yes definitely',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        'Don\'t count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful',
        'No',
    ];
    Mike.exec.snap(message, `:8ball: \`${await Mike.utils.array.random(outcomes, 1)}\``, false,)
}
exports.data = {
    triggers: ['8ball', '8b'],
    description: 'Asks 8ball a question.',
    usage: [
        '{prefix}{command} <question>'
    ],
    args: [
        {
            'type':'any',
            'name':'question'
        }
    ]
}
