module.exports = async (guild) => {
  if (Mike.type == "beta") return
  return Mike.models.mult({
    channel: Mike.logs.servers,
    title: "Added to Guild",
    fields: [
      ["Server Name", guild.name, true],
      ["Server ID", guild.id, true],
      ["Server Owner", guild.owner ? guild.owner.user.tag : 'Unknown', true],
      ["Server Owner ID", guild.owner.id, true],
      ["Members", guild.members.filter(m => !m.user.bot).size, true],
      ["Bots", guild.members.filter(m => m.user.bot).size, true]
    ],
    thumbnail: guild.icon ? guild.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(guild.nameAcronym)}`,
    color: Mike.colors.green
  })
}
