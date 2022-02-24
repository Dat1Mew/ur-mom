module.exports = {
    name: "hide",
    description: "hides all channels",
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.guild.channels.cache.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                })
            })
            message.channel.send("All channels have been hidden!")
        } else {
            message.channel.send("You do not have permission to use this command!")
        }
    }
}