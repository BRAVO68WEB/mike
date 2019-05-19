const chalk = require('chalk');
const Discord = require('discord.js');
// const info = chalk.bold.yellow;
const core = chalk.white.bgYellow.bold
const info = chalk.white.bgGreen.bold
const db = chalk.white.bgCyan.bold
const time = chalk.white.bgBlue.bold
const stream = chalk.white.bgMagenta.bold
const cerror = chalk.white.bgRed.bold
exports.core = async (message) => {
    console.log(`${core('[MIKE CORE]')} ${message}`)
}


exports.info = async (message) => {
    console.log(`${time(`[` + await Mike.utils.time.getTime() + `]`)}${info('[INFO]')} ${message}`)
}

exports.stream = async (message) => {
    console.log(`${time(`[` + await Mike.utils.time.getTime() + `]`)}${stream('[STREAM-NOTIFIER]')} ${message}`)
}

exports.db = async (message) => {
    console.log(`${time(`[` + await Mike.utils.time.getTime() + `]`)}${db('[DATABASE]')} ${message}`)
}

exports.error = async (message) => {
    console.log(`${time(`[` + await Mike.utils.time.getTime() + `]`)}${cerror('[ERROR]')} ${message}`)
    const wh = new Discord.WebhookClient(`546085781064908830`, `pUyw86nagZ8f4u8mTpdTTRwGVJ7cAUqJNYE-zWTAIsswpSG4z25azCjFlBy4MTr9wBkQ`);
    const embed = new Discord.RichEmbed()
        .setDescription(`[ERROR] ${message}`)
        .setColor("#f4425c")
    wh.send(embed);
}

exports.command = async (message) => {
    const wh = new Discord.WebhookClient(`546087339802361877`, `SRvfPTlu5xW8-dCEoV6RBjYd7KfIUqSN6mHwHZnZTaB1KJ72Sskq4fPjIchdYrO7DCKS`);
    const embed = new Discord.RichEmbed()
        .setDescription(`[${message.author.tag}] [${message.author.id}]\n[${message.guild.name}] [${message.guild.id}]\n${message.content}`)
        .setColor("#fccc64")
    wh.send(embed);
}

exports.guildadd = async (guild) => {
    console.log(`${time(`[` + await Mike.utils.time.getTime() + `]`)}${info('[NEW GUILD]')} ${guild.name}`)
    const wh = new Discord.WebhookClient(`537690537914793994`, `pNc4XsqQ6pLPKD-q1bucllDAa5x_Aba4ydRnZsVKPuDvfIw_i_Fb3N7lyuSdJvD87GZ-`);
    const embed = new Discord.RichEmbed()
        .setTitle("Added to Guild")
        .addField("Server Name", guild.name, true)
        .addField("Server ID", guild.id, true)
        .addField("Server Owner", guild.owner ? guild.owner.user.tag : 'Unknown', true)
        .addField("Server Owner ID", guild.ownerID, true)
        .addField("Members",guild.members.filter(m => !m.user.bot).size, true)
        .addField("Bots",guild.members.filter(m => m.user.bot).size, true)
        .setThumbnail(guild.icon ? guild.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(guild.nameAcronym)}`)
        .setColor("#68f442")
        .setTimestamp(new Date())
    wh.send(embed);
}

exports.guildremove = async (guild) => {
    console.log(`${time(`[` + await Mike.utils.time.getTime() + `]`)}${info('[REMOVED FROM GUILD]')} ${guild.name}`)
    const wh = new Discord.WebhookClient(`537690537914793994`, `pNc4XsqQ6pLPKD-q1bucllDAa5x_Aba4ydRnZsVKPuDvfIw_i_Fb3N7lyuSdJvD87GZ-`);
    const embed = new Discord.RichEmbed()
        .setTitle("Removed from Guild")
        .addField("Server Name", guild.name, true)
        .addField("Server ID", guild.id, true)
        .addField("Server Owner", guild.owner ? guild.owner.user.tag : 'Unknown', true)
        .addField("Server Owner ID", guild.ownerID, true)
        .addField("Members",guild.members.filter(m => !m.user.bot).size, true)
        .addField("Bots",guild.members.filter(m => m.user.bot).size, true)
        .setThumbnail(guild.icon ? guild.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(guild.nameAcronym)}`)
        .setColor("#fccc64")
        .setTimestamp(new Date())
    wh.send(embed);
}
