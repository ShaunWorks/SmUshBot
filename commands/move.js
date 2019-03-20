module.exports = {
	name: 'move',
	description: 'Get the frame data of a character\'s move.',
	aliases: ['framedata'],
	cooldown: 5,
	execute(message, args, axios) {
		axios({
			method: 'get',
			url: `https://test-khapi.frannsoft.com/api/characters/name/${args[0]}/moves?game=ultimate`
		})
		.then(function (response) {
            console.log(response.data);
            const move = response.data.find(function(element) {
                return element.Name === args.slice(1).join(' ');
            })

            console.log(move);
            console.log(args.slice(1).join(' '))
			// gets available characters
			// const characters = [];
			// console.log(response.data);
			// response.data.forEach(char => {
			// 	characters.push(char.Name);
			// })
			// characters.sort();
			// message.channel.send('You can get frame data on the following characters:\n' + characters.join(', '));
		})
		.catch(function (error) {
			message.channel.send('Sorry, I couldn\'t get any data. Maybe the server is down?');
			console.log('Error: ' + error);
		})
	},
};