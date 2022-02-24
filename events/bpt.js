module.exports = {
    name: "messageCreate",

    async execute(message) {
        if (message.author.bot) return
        if (message.content.toLowerCase() == "banana pudding tonight") {
            if (new Date().getDay() === 6) {
                message.channel.send('banana pudding tonight')
            }
        }
    }
}