module.exports = async (cl, client) => {
	process.stdout.write('\x1Bc');
	console.log(`[Client] >>> Successfully logged in as ${client.user.tag} [${client.user.id}]`);
};