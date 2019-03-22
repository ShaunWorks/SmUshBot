module.exports = {
	name: 'move',
	description: 'Get the frame data of a character\'s move.',
	aliases: ['framedata'],
	cooldown: 5,
	execute(message, args, axios) {
		const character = args[0].substring(0,1).toUpperCase() + args[0].substring(1);
		axios({
			method: 'get',
			url: `https://test-khapi.frannsoft.com/api/characters/name/${character}/moves?game=ultimate`
		})
		.then(function (response) {
			let move = args.slice(1).join(' ')
			move = move.substring(0,1).toUpperCase() + move.substring(1);
			const moveArr = response.data.filter(element => element.Name.includes(move));

			let movedata = ''
			moveArr.forEach(arr => {
				movedata += `Move: ${arr.Name} \n`;
				movedata += `Hitbox Active: ${arr.HitboxActive} \n`;
				movedata += `First Actionable Frame: ${arr.FirstActionableFrame} \n`;
				movedata += `Base Damage: ${arr.BaseDamage} \n`;
				movedata += '\n';
			})
			message.channel.send(movedata);
		})
		.catch(function (error) {
			message.channel.send('Sorry, I couldn\'t get any data. Maybe the server is down?');
			console.log('Error: ' + error);
		})
	},
};