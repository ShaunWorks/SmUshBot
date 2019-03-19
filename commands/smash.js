module.exports = {
	name: 'smash',
	description: 'Get smash data!',
	aliases: ['s'],
	args: true,
	usage: '[character name]',
	cooldown: 5,
	execute(message, args, axios) {
		axios({
			method: 'get',
			url: 'https://test-khapi.frannsoft.com/api/characters?game=ultimate'
		})
		.then(function (response) {
			// gets available characters
			const characters = [];
			console.log(response.data);
			response.data.forEach(char => {
				characters.push(char.Name);
			})
			characters.sort();
			message.channel.send(characters.join(', '));
		})
		.catch(function (error) {
			console.log('Error: ' + error);
		})
	},
};