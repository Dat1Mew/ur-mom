module.exports = {
    name: "hide",
    description: "hides all channels",
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.guild.channels.cache.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    VIEW_CHANNEL: true
                })
            })
            message.channel.send("All channels have been shown!")
        } else {
            message.channel.send("You do not have permission to use this command!")
        }
    }
}