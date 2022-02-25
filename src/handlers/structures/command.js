const fs = require('fs');
const Discord = require('discord.js');

module.exports = (client) => {
	client.commands = new Discord.Collection();
	const load = dirs => {
		const commands = fs.readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
		for (const file of commands) {
			const pull = require(`../../commands/${dirs}/${file}`);
			client.commands.set(pull.data.name, pull);
		}
	};
	fs.readdirSync('./commands').forEach(x => load(x));
};