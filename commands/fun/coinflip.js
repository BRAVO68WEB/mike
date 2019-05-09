exports.output = async ({message}) => {
    const outcomes = [
        'tails',
        'heads',
    ];
    Mike.exec.snap(message, `Flipped: \`${await Mike.utils.array.random(outcomes, 1)}\``, false, 'https://cdn.dribbble.com/users/58530/screenshots/2323771/coin-flip.gif')
}
exports.data = {
    triggers: ['flipcoin','coinflip'],
    description: 'Flips the coin.'
}
