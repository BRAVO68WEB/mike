module.exports = async (message) => {
    try{
        let img = null
        if (message.attachments.array()[0] != undefined) img = message.attachments.array()[0].url
        await Mike.db.update("guilds",message.guild.id,"snipe",{
            author: message.author.id,
            content: message.content,
            image: img
        })
    }catch(err) {

    }
};
