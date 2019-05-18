const { Collection } = require('discord.js');
const fs = require('fs');

class CommandsLoader {
    constructor(Mike) {
        Mike.commands = new Collection()

        fs.readdirSync('./commands/').forEach(category => {

            const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {

                const command = require(`../commands/${category}/${file}`);

                Mike.commands.set(command.data.triggers, command, category);
            }

            Mike.categories.push(category);

        });
    }
}

module.exports = CommandsLoader
