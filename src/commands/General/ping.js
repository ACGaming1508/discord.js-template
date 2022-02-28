module.exports = {
	data: {
		name: 'ping',
		description: 'Get the client\'s latency',
		options: null,
		default_permission: true,
		clientPermissions: null,
		userPermissions: null,
		allowEphemeral: true,
	},
	async execute(client, interaction) {
		const msg = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const embed = [
			{
				'title': 'Pong!',
				'color': client.colors.main,
				'fields': [
					{
						'value': `\`${msg.createdTimestamp - interaction.createdTimestamp}\` ms`,
						'name': 'API',
						'inline': true,
					},
					{
						'value': `\`${Math.round(client.ws.ping)}\` ms`,
						'name': 'Average Websocket',
						'inline': true,
					},
				],
			},
		];
		return interaction.editReply({ content: null, embeds: embed });
	},
	async messageRun(client, message, args) {
		const msg = await message.reply('Pinging...');
		const embed = [
			{
				'title': 'Pong!',
				'color': client.colors.main,
				'fields': [
					{
						'value': `\`${msg.createdTimestamp - message.createdTimestamp}\` ms`,
						'name': 'API',
						'inline': true,
					},
					{
						'value': `\`${Math.round(client.ws.ping)}\` ms`,
						'name': 'Average Websocket',
						'inline': true,
					},
				],
			},
		];
		return msg.edit({ content: null, embeds: embed });
	},
};
