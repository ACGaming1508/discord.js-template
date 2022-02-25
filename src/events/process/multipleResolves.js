module.exports = async (client, type, promise, reason) => {
	console.log('[Process] >>> Multiple Resolves');
	console.log(type, promise, reason);
};