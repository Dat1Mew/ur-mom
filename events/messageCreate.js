const { Collection } = require("discord.js");
const { prefix, owner } = require("../config.json");

const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = {
	name: "messageCreate",

	async execute(message) {
		const { client, guild, channel, content, author } = message;

		if (
			message.content == `<@${client.user.id}>` ||
			message.content == `<@!${client.user.id}>`
		) {
			require("../messages/onMention").execute(message);
			return;
		}

		const checkPrefix = prefix.toLowerCase();

		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		);

		if (!prefixRegex.test(content.toLowerCase())) return;

		const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

		const args = content.slice(matchedPrefix.length).trim().split(/ +/);

		const commandName = args.shift().toLowerCase();

		if (!message.content.startsWith(matchedPrefix) || message.author.bot)
			return;

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) return;

		if (command.ownerOnly && !owner.includes(author.id)) {
			return message.reply({ content: "This command is owner only!" });
		}

		if (command.guildOnly && message.channel.type === "dm") {
			return message.reply({
				content: "This command cannot be done in dms!",
			});
		}

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: "You can't do this!" });
			}
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments!`;

			if (command.usage) {
				reply += `\nThe correct use would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send({ content: reply });
		}

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply({
					content: `Wait ${timeLeft.toFixed(
						1
					)} more second(s) befure reusing the \`${command.name}\` command.`,
				});
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply({
				content: "Something went wrong!",
			});
		}
	},
};