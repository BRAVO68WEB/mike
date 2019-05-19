exports.output = async ({message, args}) => {
    const mention = message.mentions.members.first();
    if (!mention.bannable) {
        return Mike.exec.error(message, `You can not ban user ${mention.user.tag}.`)
    }
    const reason = args.slice(1).join(' ');
    try {
        if (reason) {
            Mike.exec.snap(message,`\`${mention.user.tag}\` has been successfuly banned! The reason for it is \`${reason}\``, false);
            return mention.ban(reason);
        }
        Mike.exec.snap(message,`\`${mention.user.tag}\` has been successfuly banned!`, false);
        return mention.ban();
    } catch (error) {
        return Mike.exec.error(message, `I can not ban user \`${mention.user.tag}\`!\nHere is the following error message \`${error.message}\`!`, false)
    }
}
exports.data = {
    triggers: ['ban','b'],
    description: 'Bans user.',
    usage: [
        '{prefix}{command} <mention> [reason]'
    ],
    args: [
        {
            'type':'mention',
            'name':'user'
        },
    ],
    userPerms: [
        "BAN_MEMBERS"
    ],
    botPerms: [
        "BAN_MEMBERS"
    ]

}
