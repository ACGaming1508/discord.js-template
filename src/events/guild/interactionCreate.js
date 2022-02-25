const config = require('../../config.json');

module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;
	if (!interaction.guild) return;
	const cmd = interaction.commandName;

	const slashCommandfile = client.commands.get(cmd);
	if (slashCommandfile) {
		if (slashCommandfile.data.clientPermissions) {
			const missing = [];
			slashCommandfile.data.clientPermissions.forEach(p => {
				if (!interaction.guild.me.permissions.has(p, true)) {
					missing.push(p);
				}
			});
			if (missing[0]) {
				return interaction.reply({
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
					ephemeral: true,
				});
			}
		}
		if (slashCommandfile.data.userPermissions) {
			const missing = [];
			slashCommandfile.data.userPermissions.forEach(p => {
				if (!interaction.memberPermissions.has(p, true)) {
					missing.push(p);
				}
			});
			if (missing[0]) {
				return interaction.reply({
					embeds: [
						{
							'title': 'Missing permission',
							'description': `You do not have enough permission to process this command\n> Required permission: ${missing.map(m => `\`${m}\``).join('\n')}`,
							'color': config.colors.wrong,
							'footer': {
								'text': client.user.tag,
								'icon_url': client.user.avatarURL({ dynamic: true }),
							},
							'timetstamp': new Date(),
						},
					],
					ephemeral: true,
				});
			}
		}
		slashCommandfile.execute(client, interaction);
	}
};