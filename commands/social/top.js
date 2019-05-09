exports.output = async ({message}) => {
    const guild = await Mike.db.getGuild(message.guild.id)
    const data = guild.allusers
    const users = Object.keys(data).sort(function(a,b){return (data[b]["lvl"]*1000000000+data[b]["xp"])-(data[a]["lvl"]*1000000000+data[a]["xp"])})
    let text = ``
    let num = 0
    let tag
    let yourrank = 0
    let loop = 1
    for (const element of users) {
        user = await Mike.db.getUser(element)
        tag = await message.guild.members.get(user.id)
        if(tag === undefined) {continue};
        tag = tag.user
        num += 1;
        if(num < 11){
            text += `**${num}.** ` + tag.tag + `\n\`Lvl: ${data[element]["lvl"]} | Xp: ${data[element]["xp"]}\`\n`
        }
        if (tag.id == message.author.id){
          yourrank = loop
        }
        loop += 1
    };
    text += `\nYour Rank: **${yourrank}**.`
    return Mike.exec.snap(message, text, false)
}
exports.data = {
    triggers: ['top'],
    description: 'Shows top users.'
}
