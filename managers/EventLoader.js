const xrequire = (event) => require(`../events/${event}`);
class EventLoader {
    constructor(Mike) {
        Mike.on('ready', () => xrequire('ready')())
        Mike.on('message', message => xrequire('message')(message))
        Mike.on('messageDelete', message => xrequire('messageDelete')(message))
        Mike.on('guildCreate', guild => xrequire('guildCreate')(guild))
        Mike.on('guildDelete', guild => xrequire('guildDelete')(guild))
        Mike.on('messageReactionAdd', (reaction, user) => xrequire('messageReactionAdd')(reaction, user))
        Mike.on('raw', e => xrequire('raw')(e))
        Mike.on('voiceStateUpdate', (old, neww) => xrequire('voiceStateUpdate')(old, neww))
        Mike.on('guildMemberAdd', (member) => xrequire('guildMemberAdd')(member))
        Mike.on('guildMemberRemove', (member) => xrequire('guildMemberRemove')(member))
        Mike.on('presenceUpdate', (oldMember, newMember) => xrequire('presenceUpdate')(oldMember, newMember))
        Mike.on('messageUpdate', (oldMessage, newMessage) => xrequire('messageUpdate')(oldMessage, newMessage))
    }
}

module.exports = EventLoader
