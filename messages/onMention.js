const { prefix } = require("../config.json");

module.exports = {
	async execute(message) {
		return message.channel.send(`My prefix is \`${prefix}\``);
	},
};