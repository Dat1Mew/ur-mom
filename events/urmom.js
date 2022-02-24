module.exports = {
    name: "messageCreate",

    async execute(message) {
        if (message.author.bot) return
        message.reply("ur mom")
    }
}