require("dotenv").config();

const Discord = require("discord.js");

const client = new Discord.Client({
	presence: {
		activity: {
			type: "LISTENING",
			name: `${process.env.DISCORD_COMMAND_PREFIX}help`,
		},
	},
});

client.once("ready", () => {
	console.log("Ready!");
});

//Listen to commands in the commands channel (except help)
client.on("message", message => {
	const prefix = process.env.DISCORD_COMMAND_PREFIX;
	//Listen to only the commands channel
	if (message.channel.id === process.env.DISCORD_CHANNELID_COMMANDS) {
		//Check message is in commands channel
		if (message.content.startsWith(prefix)) {
			//Valid command syntax; handle command
			//Tokenize command into words
			const cmd = message.content.slice(1).trim().split(" ");
			switch (cmd[0]) {
				case "help":

					break;
				case "ping":
					message.channel.send("Pong!");
					break;
				case "initr":
					message.channel.send("Role init...");
					message.guild.roles
						.create({
							data: {
								name: `${process.env.USERGROUP_NAME_PREFIX}groupie tester`,
								color: "DEFAULT",
							},
						})
						.then(console.log)
						.catch(console.error);
					break;
				case "addme":
					message.channel.send("Adding you to role...");
					const role = message.guild.roles.cache.find(role => role.name === `${process.env.USERGROUP_NAME_PREFIX}groupie tester`);
					message.member.roles.add(role);
					break;
				default:
					message.channel.send(`\`${cmd[0]}\`? I'm not sure what you meant, try saying \`${prefix}help\` :)`);
			}
		}
	} else if (message.content.trim() === `${prefix}help`) {
		//Exception for help
		message.channel.send(`Try saying that in ${message.guild.channels.cache.get(process.env.DISCORD_CHANNELID_COMMANDS)} instead (｡•̀ᴗ-)✧`);
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
