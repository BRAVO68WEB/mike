const Discord = require('discord.js');

exports.output = async ({message, args}) => {
    const [channelid, messageid, ...note] = args
    const channel = channelid == "here" ? message.channel : Mike.channels.get(channelid);
    if (!channel) {
        return Mike.exec.error(message, "Channel not found");
    }
    const msgu = messageid === "last" ? message.channel.messages.last(2)[0] : await channel.fetchMessage(messageid);
    if (!msgu) {
        return Mike.exec.error(message, "Message not found");
    }
    const embed = new Discord.RichEmbed()
        .setAuthor(`${msgu.author.username} (${msgu.author.id})`,msgu.author.displayAvatarURL)
        .setDescription(msgu.content)
        .setTimestamp(msgu.createdAt)
        .setFooter(`In ${channel.guild.name} : #${channel.name}`);
    return message.channel.send(`**${message.author.username}**: ${note.join(" ")}`, {embed}).then(message.delete().catch(e => console.log(e)));
}

exports.data = {
    triggers: ['quote'],
    description: 'Quote someone.',
    usage: [
        '{prefix}{command} <channel id> <message id> [text] ',
        '{prefix}{command} here last [text]'
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]
}
