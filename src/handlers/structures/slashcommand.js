const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = (client) => {
	client.slashCommands = new Discord.Collection();
	const SlashCommands = [];
	fs.readdirSync('./commands').forEach(folder => {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(d => d.endsWith('.js') && typeof c.execute === 'function');
		for (const file of commandFiles) {
			const command = require(`../../commands/${folder}/${file}`);
			client.slashCommands.set(command.data.name, command);
			const ephemeralOption = {
		     		"type": 5,
      				"name": "ephemeral",
      				"description": "If the respond should be hidden (Only you can see) or not.",
			};
			const s = {
				'name': command.data.name,
				'description': command.data.description,
				'options': command.data.options ? command.data.options.push(command.data.allowEphemeral ? ephemeralOption : null),
				'default_permission': command.data.default_permission,
			};
			SlashCommands.push(s);
		}
	});
	const rest = new REST({ version: '9' }).setToken(config.ClientConfig.token);

	(async () => {
		try {

			await rest.put(
				Routes.applicationCommands(config.ClientConfig.id),
				{ body: SlashCommands },
			);

		}
		catch (error) {
			console.error(error);
		}
	})();
};
