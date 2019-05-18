exports.output = async ({message}) => {
    Mike.exec.reddit(message, "surrealmemes", "image")
}
exports.data = {
    triggers: ['surreal'],
    description: 'Shows random surreal post .'
}
