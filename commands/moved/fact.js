module.exports = {
    name: "fact",
    description: "Boom random fact",
    execute(message, args) {
        fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            const fact = data.text

            message.channel.send({content: fact})
        });
    }
}