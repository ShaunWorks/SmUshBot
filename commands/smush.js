module.exports = {
	name: 'smush',
	description: 'Get the characters that currently have data available.',
	aliases: ['s'],
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
			message.channel.send('You can get frame data on the following characters:\n' + characters.join(', '));
		})
		.catch(function (error) {
			message.channel.send('Sorry, I couldn\'t get any data. Maybe the server is down?');
			console.log('Error: ' + error);
		})
	},
};