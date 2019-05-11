exports.output = async ({message, args}) => {
    const guild = await Mike.db.getGuild(message.guild.id)

    const dot = `<:dcOffline:495281269379432449>`
    const en = `<:dcOnline:495281269391884288> \`Enabled\``
    const di = `<:dcDnd:495281269609857024> \`Disabled\``
    const col = `\``
    const page1 =`
    _**${message.guild.name} settings:**_

    **Custom Prefix**
    ${guild.prefix ? en : di}
    ${dot} \`Prefix\`: **${guild.prefix ? guild.prefix : `[not set]`}**
    \`m!settings prefix [new prefix]\`

    **Level Up Mesages**
    ${guild.settings.lvlupmess ? en : di}
    \`m!settings lvlupmess [disable/enable]\`

    **Snipes**
    ${guild.settings.snipes ? en : di}
    \`m!settings snipes [disable/enable]\`

    **Starboard**
    ${guild.star.enabled ? en : di}
    ${dot} \`Channel\`: **${guild.star.channel != `` ? `<#${guild.star.channel}>` : `[not set]`}**
    ${dot} \`Stars required\`: **${guild.star.number}**
    \`m!settings starboard [disable/enable]\`
    \`m!settings starboard channel [#channel]\`
    \`m!settings starboard stars [1-10]\`
    `

    const page2 =`
    _**${message.guild.name} settings:**_

    **Member Logs**
    ${guild.settings.mlogs.enabled ? en : di}
    ${dot} \`Channel\`: **${guild.settings.mlogs.channel != `` ? `<#${guild.settings.mlogs.channel}>` : `[not set]`}**
    \`m!settings memberlogs [disable/enable]\`
    \`m!settings memberlogs channel [#channel]\`

    **Suggestions**
    ${guild.settings.suggestions.enabled ? en : di}
    ${dot} \`Channel\`: **${guild.settings.suggestions.channel != `` ? `<#${guild.settings.suggestions.channel}>` : `[not set]`}**
    \`m!settings suggestions [disable/enable]\`
    \`m!settings suggestions channel [#channel]\`

    **Welcome Message**
    ${guild.settings.wmess.enabled ? en : di}
    ${dot} \`Channel\`: **${guild.settings.wmess.channel != `` ? `<#${guild.settings.wmess.channel}>` : `[not set]`}**
    ${dot} \`Message\`: **${guild.settings.wmess.message != `` ? (guild.settings.wmess.message.length < 16 ? guild.settings.wmess.message : `${guild.settings.wmess.message.substring(0, 16)}...`) : `[not set]`}**
    \`m!settings wmess [disable/enable]\`
    \`m!settings wmess channel [#channel]\`
    \`m!settings wmess message [\`[text](http://mikebot.xyz/guide)\`]\`
    `

    const page3 =`
    _**${message.guild.name} settings:**_

    **Message Update Logs**
    ${guild.settings.mupdatelogs.enabled ? en : di}
    ${dot} \`Channel\`: **${guild.settings.mupdatelogs.channel != `` ? `<#${guild.settings.mupdatelogs.channel}>` : `[not set]`}**
    \`m!settings mupdatelogs [disable/enable]\`
    \`m!settings mupdatelogs channel [#channel]\`

    **Message Delete Logs**
    ${guild.settings.mdeletelogs.enabled ? en : di}
    ${dot} \`Channel\`: **${guild.settings.mdeletelogs.channel != `` ? `<#${guild.settings.mdeletelogs.channel}>` : `[not set]`}**
    \`m!settings mdeletelogs [disable/enable]\`
    \`m!settings mdeletelogs channel [#channel]\`

    **Commands In Channels**
    ${dot} \`Disabled Channels\`: **${guild.settings.disabledChannels.length}**
    \`m!settings channel [disable/enable] [#channel]\`

    `

    if (args[0] == `1` || !args[0]) return Mike.exec.snap(message, page1, false, null, null, `Page 1 of 3 -- m!settings [page]`)
    if (args[0] == `2`) return Mike.exec.snap(message, page2, false, null, null, `Page 2 of 3 -- m!settings [page]`)
    if (args[0] == `3`) return Mike.exec.snap(message, page3, false, null, null, `Page 3 of 3 -- m!settings [page]`)
    if (args[0] == `prefix`) require("../../settings/prefix")(message, guild, args)
    if (args[0] == `lvlupmess`) require("../../settings/lvlupmess")(message, guild, args)
    if (args[0] == `snipes`) require("../../settings/snipes")(message, guild, args)
    if (args[0] == `starboard`) require("../../settings/starboard")(message, guild, args)
    if (args[0] == `memberlogs`) require("../../settings/mlogs")(message, guild, args)
    if (args[0] == `suggestions`) require("../../settings/suggestions")(message, guild, args)
    if (args[0] == `wmess`) require("../../settings/wmess")(message, guild, args)
    if (args[0] == `mupdatelogs`) require("../../settings/mupdatelogs")(message, guild, args)
    if (args[0] == `mdeletelogs`) require("../../settings/mdeletelogs")(message, guild, args)
    if (args[0] == `channel`) require("../../settings/channels")(message, guild, args)
  }
  exports.data = {
      triggers: ['settings'],
      description: 'Changes settings for guild.',
      userPerms: [
          "MANAGE_GUILD"
      ]
  }
