module.exports = {
	name: 'role',
	description: 'role',
	args: true,
	usage: '<user> <role>',
	execute(message, args) {
		const msg = [];
		for (let i = 0; i < args.length; i++) {
			msg.push(`Message ${i}: ${args[i]}`);
		}
		message.channel.send(msg);
	},
};