function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(2);
		}, ms);
	});
}

module.exports = sleep;