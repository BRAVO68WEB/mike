module.exports = async (message, guild) => {
  return new Promise(async (resolve, reject) => {
    resolve(false);
    if (message.member.hasPermission('MANAGE_GUILD')) return;
    let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
    if (!links) return;
    if (!hasDiscordInvite(message.content)) return
    if (!guild.settings.filters.invite) return
    resolve(true)
    if (message.deletable) {
        message.delete().catch(() => {});
    }
    Mike.exec.error(message, `${message.author.tag} you are not allowed to post server invite links here.`).then(msg => {
      msg.delete(5000).catch(() => {});
    })


    function hasDiscordInvite(string) {
      let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
      if (discordInvite.test(string)) return true;
      return false;
    }
  })
}
