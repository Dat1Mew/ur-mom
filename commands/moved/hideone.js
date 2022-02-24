module.exports = {
    name: "hideone",
    description: "hides one specified channel",
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {

            try {
            const channel = message.guild.channels.cache.get(args[0])

            channel.updateOverwrite(message.guild.roles.everyone, {
                VIEW_CHANNEL: false
            })

            message.channel.send(`Channel ${channel} has been hidden.`)
            
            } catch (err) {
                message.channel.send("Something went wrong")
            }
        } else {
            message.channel.send("You do not have permission to use this command!")
        }
    }
}