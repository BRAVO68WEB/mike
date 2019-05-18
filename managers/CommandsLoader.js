const { Collection } = require('discord.js');
const fs = require('fs');

class CommandsLoader {
    constructor(Mike) {
        Mike.commands = new Collection()

        fs.readdirSync('./commands/').forEach(category => {

            const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {

                let command = require(`../commands/${category}/${file}`);
                command.data.category = category
                Mike.commands.set(command.data.triggers, command);
            }

            Mike.categories.push(category);

        });
    }
}

module.exports = CommandsLoader
