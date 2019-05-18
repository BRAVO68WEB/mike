module.exports = async (message, guild, args) => {
  if(args[1] == "enable" || args[1] == "disable"){
    let category = args[2]
    if (!args[2]) return Mike.exec.error(message,"You need to name a category.")
    if(args[1] == "enable") {
      for( var i = 0; i < guild.settings.disabledCategories.length; i++){
         if (guild.settings.disabledCategories[i] === category) {
           guild.settings.disabledCategories.splice(i, 1);
         }
      }
    } else {
      if (guild.settings.disabledCategories.includes(category)) {
        return Mike.exec.error(message,"This category was already disabled.",)
      }
      if (!Mike.categories.includes(category)) {
        return Mike.exec.error(message,"Category doesn't exist.",)
      }
      if (category == `moderation`) {
        return Mike.exec.error(message,"You can't disable this category.",)
      }
      guild.settings.disabledCategories.push(category)

    }
    await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
    await Mike.db.getGuild(message.guild.id)
    return Mike.exec.snap(message,"Done.")
  } else {
      return Mike.exec.error(message,"You can only disable or enable this option.",)
  }


}
