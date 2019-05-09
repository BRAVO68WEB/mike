exports.output = async ({message}) => {
    const users =  message.channel.members.filter(m => !m.user.bot).array()
    const randomuser = await Mike.utils.array.single(users)
    Mike.exec.snap(message,`${await Mike.utils.lennyface.random()} **(${randomuser.user.username})**`, false)
}
exports.data = {
    triggers: ['someone'],
    description: 'Picks @someone.'
}
