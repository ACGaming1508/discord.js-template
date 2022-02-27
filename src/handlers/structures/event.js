const fs = require('fs');

module.exports = (client) => {
	const load = dirs => {
		const events = fs.readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
		for (const file of events) {
			const evt = require(`../../events/${dirs}/${file}`);
			const eName = file.split('.')[0];
			switch (dirs) {
			case 'client':
				client.on(eName, evt.bind(null, client));
				break;
			case 'guild':
				client.on(eName, evt.bind(null, client));
				break;
			case 'process':
				process.on(eName, evt.bind(null, client));
			}

		}
	};
	fs.readdirSync('./events').forEach(x => load(x));
};
