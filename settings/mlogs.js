module.exports = async (message, guild) => {
  
  Mike.exec.snap(message, `
  **1.** \`Enable\`
  **2.** \`Disable\`
  **3.** \`Change Channel\`

  Type specific **number** to change settings.
  `, false)
    const s = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
    if(s == "1") {
        guild.settings.mlogs.enabled = true;
        await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
        await Mike.db.getGuild(message.guild.id)
        return Mike.exec.snap(message,"Done.")
    } else if (s == "2") {
        guild.settings.mlogs.enabled = false;
        await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
        await Mike.db.getGuild(message.guild.id)
        return Mike.exec.snap(message,"Done.")
    }  else if (s == "3") {
        Mike.exec.snap(message,"Mention new channel.")
        const nc = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
        let channel
        if(nc){
            if (nc.content.startsWith('<#') && nc.content.endsWith('>')) {
                const id =  nc.content.replace(/[<#>]/g, '');
                if (message.guild.channels.has(id)) {
                    channel = message.guild.channels.get(id).id;
                } else {
                    channel = message.guild.channels.get(nc.content).id;
                }
                if (channel) {
                    guild.settings.mlogs.channel = channel;
                    await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
                    await Mike.db.getGuild(message.guild.id)
                    return Mike.exec.snap(message,"Done.")
                } else {
                    return Mike.exec.error(message,"Action cancelled. (Channel not found)")
                }
            } else {
                return Mike.exec.error(message,"Action cancelled. (You need to mention a channel)")
            }
        } else {
            return Mike.exec.error(message,"Action cancelled.")
        }

    } else {
        return Mike.exec.error(message,"Action cancelled.")
    }

}
