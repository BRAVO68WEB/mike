exports.output = async ({message}) => {
    Mike.exec.snap(message,`Rolled: \`${await Mike.utils.number.random(1,6)}\``,false ,'https://media.giphy.com/media/l4hLAf6Eo8DEcO5ZS/giphy.gif')
}
exports.data = {
    triggers: ['dice', 'd6'],
    description: 'Flips the coin.'
}
