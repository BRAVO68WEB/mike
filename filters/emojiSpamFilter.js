module.exports = async (message, guild) => {
  return new Promise(async (resolve, reject) => {
    resolve(false);
    if (!message.content) return;
    if (!guild.settings.filters.emojis) return
    if (message.member.hasPermission('MANAGE_GUILD')) return;
    let nativeEmojisRegExp = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    let customEmojisRegExp = /<(?:a)?:[a-z0-9_-]{1,256}:[0-9]{16,19}>/gi;
    let nativeEmojis = message.content.match(nativeEmojisRegExp) || [];
    let customEmojis = message.content.match(customEmojisRegExp) || [];
    let cleanMessage = message.content.replace(nativeEmojisRegExp, '');
    leanMessage = cleanMessage.replace(customEmojisRegExp, '');
    cleanMessage = cleanMessage.trim();
    let emojis = nativeEmojis.concat(customEmojis);
    if (emojis.length < 4) return
    let emojiPercentage = emojis.length / (cleanMessage.length + emojis.length) * 100;
    if (emojiPercentage > 50) resolve(true);
    else return resolve(false);
    if (message.deletable) {
        message.delete().catch(() => {});
    }
    Mike.exec.error(message, `${message.author.tag} you are not allowed to spam with emojis.`).then(msg => {
      msg.delete(5000).catch(() => {});
    })


    function hasDiscordInvite(string) {
      let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
      if (discordInvite.test(string)) return true;
      return false;
    }
  })
}
