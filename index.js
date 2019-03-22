const axios = require('axios');

const fs = require('fs');
const { prefix, discordToken, smashggToken } = require('./config.json');
const Discord = require('discord.js');


// smash.gg testing 
// const smashgg = require('smashgg.js');
// smashgg.initialize(smashggToken)
// const Tournament = smashgg.Tournament;
// const Event = smashgg.Event;
// require('colors');

// (async function(){
//     let tournamentSlug = 'smash-ultimate-summit';
//     let eventSlug = 'ultimate-singles';
//     let meleeAtFunction = await Event.get(tournamentSlug, eventSlug);
 
//     let sets = await meleeAtFunction.getSets();
//     let phaseGroups = await meleeAtFunction.getPhaseGroups();
 
//     console.log('Function 1 had %s sets played in %s phase groups', 
//         sets.length, phaseGroups.length);
 
//     console.log('Set Results:')
//     for(var i in sets){
//         console.log(`${String(sets[i].getFullRoundText()).magenta}: ${String(sets[i].getDisplayScore()).green}`);
//     }
 
//     return true; // exit async
// })();


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.login(discordToken);

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if(command.usage) {
			reply += `\nThe proper usage would be: '${prefix}${command.name} ${command.usage}'`;
		}

		return message.channel.send(reply);
	}

	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if(timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args, axios);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command.');
	}
});

module.exports = client;