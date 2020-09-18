require("dotenv").config();

const Discord = require("discord.js");

//Default perms for a usergroup role
//const ugPerms = new Discord.Permissions([]);

//Allowed characters in usergroup role names
const allowedUGRoleCharsRegex = /^[a-z0-9\-\'\"\_\.\(\)\[\]\{\}\/\?&#@!$%^*~<>,:+=]+$/i;

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
	let cmdStr = message.content.trim();
	//Global ping command
	if (cmdStr.slice(0, 5) === `${prefix}ping`) {
		//Remove command
		cmdStr = cmdStr.slice(cmdStr.indexOf(" ")).trim();
		let next_space = cmdStr.indexOf(" ");
		let proper_ugname_end = next_space >= 0 ? next_space : cmdStr.length;
		const ugName = cmdStr.slice(0, proper_ugname_end);
		const pingMessage = cmdStr.slice(proper_ugname_end).trim();
		const fullUGName = `${process.env.USERGROUP_NAME_PREFIX}${ugName}`;
		message.channel.send(
			`Heyy ${message.guild.roles.cache.find(role => role.name === fullUGName)}, ${
				pingMessage
					? `important message from ${message.member.user}: ${pingMessage}`
					: `you got a ping from ${message.member.user}!`
			}`
		);
	} else if (message.channel.id === process.env.DISCORD_CHANNELID_COMMANDS) {
		//Check message is in commands channel
		if (message.content.startsWith(prefix)) {
			//Valid command syntax; handle command
			//Tokenize command into words
			const cmd = message.content.slice(1).trim().split(" ");
			switch (cmd[0]) {
				case "help":
					{
						message.channel
							.send(`Hii ${message.member.user}!! I am your friendly neighborhood usergroup manager! I can do the following things for you:
\`${prefix}make <name>\` Make a usergroup called <name> and join it
\`${prefix}join <name>\` Join a usergroup called <name>
\`${prefix}leave <name>\` Leave a usergroup called <name>
\`${prefix}ping <name> [message]\` Ping the <name> usergroup with an optional [message]`);
					}
					break;
				case "ping":
					{
						message.channel.send("Pong!");
					}
					break;
				case "make":
					{
						const ugName = cmd[1];
						//Make sure ug name isn't blank
						if (!ugName) {
							message.channel.send(`Silly, I need to know the usergroup's name before I make it`);
						} else if (ugName.match(allowedUGRoleCharsRegex)) {
							//Only allow typable chars in ug name
							const fullUGName = `${process.env.USERGROUP_NAME_PREFIX}${ugName}`;
							//Make sure the ug name isn't taken
							if (message.guild.roles.cache.find(role => role.name === fullUGName)) {
								message.channel.send(`I can't use that usergroup name because it's already taken :(`);
							} else {
								message.guild.roles
									.create({
										data: {
											name: fullUGName,
											color: "DEFAULT",
										},
									})
									.then(() => {
										message.channel.send(
											`Cheers! I made your usergroup, ${message.guild.roles.cache.find(
												role => role.name === fullUGName
											)}.`
										);
									});
							}
						} else {
							message.channel.send(
								`Sorry, that usergroup name contains invalid characters. I can only accept names that satisfy the \`${allowedUGRoleCharsRegex.toString()}\` regex rule :(`
							);
						}
					}
					break;
				case "join":
					{
						const ugName = cmd[1];
						//Make sure ugName isn't blank
						if (!ugName) {
							message.channel.send(`Silly, I need to know the usergroup's name before I add you to it`);
						} else {
							const fullUGName = `${process.env.USERGROUP_NAME_PREFIX}${ugName}`;
							const role = message.guild.roles.cache.find(role => role.name === fullUGName);
							//Make sure role exists
							if (role) {
								message.member.roles.add(role);
								message.channel.send(`Yay! You're now part of the \`${ugName}\` usergroup!`);
							} else {
								message.channel.send(
									`Sorry, I couldn't find that usergroup. Make sure that you don't include \`@${process.env.USERGROUP_NAME_PREFIX}\` at the beginning of the usergroup name in your command.`
								);
							}
						}
					}
					break;
				case "leave":
					{
						const ugName = cmd[1];
						//Make sure ugName isn't blank
						if (!ugName) {
							message.channel.send(`Silly, I need to know the usergroup's name before I remove you from it`);
						} else {
							const fullUGName = `${process.env.USERGROUP_NAME_PREFIX}${ugName}`;
							const role = message.guild.roles.cache.find(role => role.name === fullUGName);
							//Make sure role exists
							if (role) {
								message.member.roles.remove(role);
								message.channel.send(`Bye! You're no longer part of the \`${ugName}\` usergroup.`);
							} else {
								message.channel.send(
									`Sorry, I couldn't find that usergroup. Make sure that you don't include \`@${process.env.USERGROUP_NAME_PREFIX}\` at the beginning of the usergroup name in your command.`
								);
							}
						}
					}
					break;
				default:
					message.channel.send(`\`${cmd[0]}\`? I'm not sure what you meant, try saying \`${prefix}help\` :)`);
			}
		}
	} else {
		//Non-commands channel version of help
		if (cmdStr === `${prefix}help`) {
			message.channel.send(
				`Try saying that in ${message.guild.channels.cache.get(process.env.DISCORD_CHANNELID_COMMANDS)} instead (｡•̀ᴗ-)✧`
			);
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);