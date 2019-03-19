// const Pokedex = require('pokedex-promise-v2');
// const P = new Pokedex();

module.exports = {
	name: 'pokemon',
	description: 'Get the info of any pokemon!',
	aliases: ['poke', 'p'],
	args: true,
	usage: '[pokemon name]',
	cooldown: 5,
	execute(message, args, P) {
		P.getPokemonByName(args[0])
			.then(function(response) {
				console.log(response);
				message.channel.send(response.id);
			})
			.catch(function(error) {
				message.channel.send('There was an ERROR: ', error);
			});
	},
};