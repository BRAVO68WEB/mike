exports.search = async(message, string, returnAuthor = true) => {
    return new Promise((resolve, reject) => {
        if(message.mentions.users.first() == null) {
            if(string == null) if(returnAuthor) return resolve(message.author); else return reject(message.author);
            if(message.client.users.get(string) != undefined) return resolve(message.client.users.get(string));
            var found = false;
            message.guild.members.forEach(member => {
                if(found) return;
                if(member.user.username.toLowerCase().includes(string)) {
                    found = true;
                    return resolve(member.user);
                }
            });
            if(!found) if(returnAuthor) resolve(message.author); else reject(message.author);
        } else resolve(message.mentions.users.first());
    }).catch(err => console.log(err));
}

exports.stringtopercent = (string) => {
    let userHash = 0;
    for (let i = 0; i < string.length; i++) {
      userHash += parseInt(string[i].charCodeAt(0));
    }
    return Math.round(parseFloat(`0.${String(userHash)}`) * 100) + 1;
}

exports.getLevel = (points) => {
  var level = -1 + Math.sqrt(4 + points/100);
  return Math.floor(level);
}

exports.getPoints = (level) => {
  return 100*(level-1)*(level+3);
}
