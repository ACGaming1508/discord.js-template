module.exports = async (client, reason, p) => {
	console.log('[Process] >>> Unhandled Rejection/Catch');
	console.log(reason, p);
};