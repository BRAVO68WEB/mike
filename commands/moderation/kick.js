exports.output = async ({message, args}) => {
    const mention = message.mentions.members.first();
    if (!mention.kickable) {
        return Mike.exec.error(message, `You can not kick user ${mention.user.tag}.`)
    }
    const reason = args.slice(1).join(' ');
    try {
        if (reason) {
            Mike.exec.snap(message,`\`${mention.user.tag}\` has been successfuly kicked! The reason for it is \`${reason}\``, false);
            return member.kick(reason);
        }
        Mike.exec.snap(message, `\`${mention.user.tag}\` has been successfuly kicked!`, false);
        return mention.kick();
    } catch (error) {
        return Mike.exec.error(message, `I can not kick user \`${mention.user.tag}\`!\nHere is the following error message \`${error.message}\`!`, false)
    }
}
exports.data = {
    triggers: ['kick','k'],
    description: 'Kicks user.',
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
        "KICK_MEMBERS"
    ],
    botPerms: [
        "KICK_MEMBERS"
    ]

}
