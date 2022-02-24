module.exports = {
	name: "ping",
	desciprion: "Shows the bot's ping",
	ownerOnly: true,
	execute(message, args) {
		message.channel.send(
			`:arrow_right: Bot's ping is: **${
				Date.now() - message.createdTimestamp
			}ms** \n:arrow_right: API's ping is: **${Math.round(
				message.client.ws.ping
			)}ms**`
		);
	},
};