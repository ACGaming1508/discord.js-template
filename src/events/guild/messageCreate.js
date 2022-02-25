const config = require('../../config.json');

module.exports = async (client, message) => {
	if (message.author.bot || message.guild === null) return;
	const gprefix = config.ClientConfig.defaultPrefix;
	if (!message.content.startsWith(gprefix)) return;

	const args = message.content.slice(gprefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const commandfile = client.commands.get(cmd);
	if (commandfile) {
		if (commandfile.data.clientPermissions) {
			const missing = [];
			commandfile.data.clientPermissions.forEach(p => {
				if (!message.guild.me.permissions.has(p, true)) {
					missing.push(p);
				}
			});
			if (missing[0]) {
				return message.reply({
					embeds: [
						{
							'title': 'Missing permission',
							'description': `I do not have enough permission to process this command\n> Required permission: ${missing.map(m => `\`${m}\``).join(', ')}`,
							'color': config.colors.wrong,
							'footer': {
								'text': client.user.tag,
								'icon_url': client.user.avatarURL({ dynamic: true }),
							},
							'timestamp': new Date(),
						},
					],
				});
			}
		}
		if (commandfile.data.userPermissions) {
			const missing = [];
			commandfile.data.userPermissions.forEach(p => {
				if (!message.member.permissions.has(p, true)) {
					missing.push(p);
				}
			});
			if (missing[0]) {
				return message.reply({
					embeds: [
						{
							'title': 'Missing permission',
							'description': `You do not have enough permission to process this command\n> Required permission: ${missing.map(m => `\`${m}\``).join(', ')}`,
							'color': config.colors.wrong,
							'footer': {
								'text': client.user.tag,
								'icon_url': client.user.avatarURL({ dynamic: true }),
							},
							'timestamp': new Date(),
						},
					],
				});
			}
		}
		if (commandfile.accessibleby === 'owner' && !config.ClientConfig.ClientOwner.includes(message.author.id)) return;
		commandfile.messageRun(client, message, args);
	}
};