module.exports = {
	name: 'hello',
	aliases: ['hi'],
	description: 'Say hello to another user.',
	args: true,
	cooldown: 5,
	usage: '<user>',
	execute(message) {
		const taggedUser = message.mentions.users.first();
		message.channel.send(`${message.author} said hello to ${taggedUser}!`);
	},
};