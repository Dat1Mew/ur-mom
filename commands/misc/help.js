const { prefix } = require("./../../config.json");

const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	description: "Help embed",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,

	execute(message, args) {
		const { commands } = message.client;

		if (!args.length) {
			let helpEmbed = new MessageEmbed()
				.setColor(0x4286f4)
				.setURL(process.env.URL)
				.setTitle("The list of all comamnds")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addField(
					"Usage",
					`\nYou can send \`${prefix}help [name of the command]\``
				);

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === "dm") return;

					message.reply({
						content: "A dm was sent",
					});
				})
				.catch((error) => {
					console.error(
						`Couldn't send the DM to ${message.author.tag}.\n`,
						error
					);

					message.reply({ content: "I can't send the message in your dms" });
				});
		}

		const name = args[0].toLowerCase();

		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply({ content: "This command does not exist" });
		}

		let commandEmbed = new MessageEmbed()
			.setColor(0x4286f4)
			.setTitle("Command");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed
				.addField("Other names", `\`${command.aliases.join(", ")}\``, true)
				.addField("Cooldown", `${command.cooldown || 3} second(s)`, true);
		if (command.usage)
			commandEmbed.addField(
				"Usage",
				`\`${prefix}${command.name} ${command.usage}\``,
				true
			);

		message.channel.send({ embeds: [commandEmbed] });
	},
};