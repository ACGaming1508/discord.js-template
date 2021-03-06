const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client({
	shards: 'auto',
	allowedMentions: {
		parse: ['roles', 'users'],
		repliedUser: false,
	},
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	presence: {
		activities: [{
			name: `${config.ClientConfig.defaultPrefix}help | ${config.ClientConfig.defaultPrefix}invite`,
			type: 'LISTENING',
		}],
		status: 'online',
	},
	failIfNotExists: false,
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_VOICE_STATES,
		// Discord.Intents.FLAGS.GUILD_BANS,
		Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		// Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
		// Discord.Intents.FLAGS.GUILD_WEBHOOKS,
		// Discord.Intents.FLAGS.GUILD_INVITES,
		Discord.Intents.FLAGS.GUILD_PRESENCES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		// Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
		// Discord.Intents.FLAGS.DIRECT_MESSAGES,
		// Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		// Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
	],
});

client.setMaxListeners(100);
require('events').defaultMaxListeners = 100;

['Emotes', 'colors'].forEach(x => client[x.toLowerCase()] = config[x]);
['slashcommand', 'command', 'event'].forEach(x => require(`./handlers/structures/${x}`)(client));

client.login(config.ClientConfig.token);
