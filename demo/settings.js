const r = require('rethinkdb');

exports.output = async ({message}) => {
    let guild = await Mike.db.getGuild(message.guild.id)
    const e = `<:dcOnline:495281269391884288>`
    const d = `<:dcDnd:495281269609857024>`
    Mike.exec.snap(message, `
${guild.prefix ? e : d} **1.** \`Custom Prefix\`
${guild.settings.lvlupmess ? e : d} **2.** \`Level Up Messages\`
${guild.settings.snipes ? e : d} **3.** \`Snipes\`
${guild.star.enabled ? e : d} **4.** \`Starboard\`
${guild.settings.mlogs.enabled ? e : d} **5.** \`Member Logs\`
${guild.settings.wmess.enabled ? e : d} **6.** \`Welcome Message\`
${guild.settings.suggestions.enabled ? e : d} **7.** \`Suggestions\`

Type specific **number** to change settings.
`, false)

    const answer = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 15*1000)

    if (answer.content == "1") {
      require("../../settings/prefix")(message, guild)
    }

    if (answer.content == "2") {
      require("../../settings/lvlupmess")(message, guild)
    }

    if (answer.content == "3") {
      require("../../settings/snipes")(message, guild)
    }

    if (answer.content == "4") {
      require("../../settings/starboard")(message, guild)
    }

    if (answer.content == "5") {
      require("../../settings/mlogs")(message, guild)
    }

    if (answer.content == "6") {
      require("../../settings/wmess")(message, guild)
    }

    if (answer.content == "7") {
      require("../../settings/suggestions")(message, guild)
    }

    if (!answer){
        return Mike.exec.error(message,"Action cancelled.")
    }
}
exports.data = {
    triggers: ['settings'],
    description: 'Changes settings for guild.',
    userPerms: [
        "MANAGE_GUILD"
    ]
}
