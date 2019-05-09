const r = require('rethinkdb');

module.exports = async (user, guild, message) => {
    try {
        await r.table('users')
                .get(user)
                .update({
                    xp:r.row('xp').add(Math.floor(Math.random() * Math.ceil(message.content.length / 2)+3))
                })
                .run(Mike.db.connection);
        //local
        const g = await Mike.db.getGuild(guild);
        const users = g.allusers;
        if(users[user]) {
            let us = users[user];
            let xp = us.xp;
            let lvl = us.lvl;
            let lvlnext = us.lvlnext;
            let newXP = Math.floor(Math.random() * Math.ceil(message.content.length / 2)+3);
            let totalXP = xp + newXP;
            if(totalXP >= lvlnext) {
                totalXP = 0;
                lvl++;
                lvlnext = 100*(lvl-1)*(lvl+3);
                if (g.settings.lvlupmess) {
                    await message.channel.send(`**${message.author.tag}** advanced to level **${lvl}**!`);
                }
            }
            await r.table('guilds').get(guild).update({allusers: r.object(user, r.object('lvl', lvl, 'xp', totalXP, 'lvlnext', lvlnext))}).run(Mike.db.connection);

        } else {
            await r.table('guilds').get(guild).update({allusers: r.object(user, r.object('lvl', 1, 'xp', 0, 'lvlnext', 80))}).run(Mike.db.connection);
        }
    } catch (e){
        console.error(e);
        return false;
    }
};
