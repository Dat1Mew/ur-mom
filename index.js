
const Discord = require("discord.js");
const config = require("./config");
const constants = require("./node_modules/discord.js/src/util/Constants.js");
constants.DefaultOptions.ws.properties.$browser = "Discord iOS";
const bot = new Discord.Client();Embed = new Discord.MessageEmbed()
const request = require('request');



bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`)
    bot.user.setActivity(`FAttY SPiNS - Doin' Your Mom`, {
        type: "LISTENING"
    })
})




//Autosave console to console.txt every minute
setInterval(function () {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var text = time + " - " + console.log;
    fs.appendFile('console.txt', text + "\n", function (err) {
        if (err) throw err;
    });
}, 60000);



//Restart bot if it crashes
process.on('uncaughtException', function (err) {
    console.log(err);
    console.log("Restarting...");
    process.exit(1);
});




// Gerneric command handle 
bot.on('message', (msg) => {
    const prefix = "<"
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (msg.content.toLowerCase().startsWith(prefix)) {
        switch (cmd) {
            

            // Hide all channels 
            case "hide":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    msg.guild.channels.cache.forEach(channel => {
                        channel.updateOverwrite(msg.guild.roles.everyone, {
                            VIEW_CHANNEL: false
                        })
                    })
                    msg.channel.send("All channels have been hidden!")
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;


                //Save all messages of a pinged user to console and say who sent them with time stamp 
            case "save":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    let user = msg.mentions.users.first()
                    if (user) {
                        let messages = msg.channel.messages.fetch({
                            limit: 100
                        }).then(messages => {
                            messages.forEach(message => {
                                if (message.author.id === user.id) {
                                    console.log(`${message.author.username} - ${message.createdAt} - ${message.content}`)
                                }
                            })
                        })
                        msg.channel.send(`${user.username}'s messages have been saved to console!`)
                    } else {
                        msg.channel.send("Please mention a user!")
                    }
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;
                
                
                //Save console to console.txt
            case "saveconsole":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    fs.writeFile('console.txt', console.log, function (err) {
                        if (err) throw err;
                    });
                    msg.channel.send("Console has been saved to console.txt!")
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;







                // Help Command 
            case "help":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    Embed.setColor('#0099ff')
                    Embed.setTitle('Ur Mom: Help commands')
                    Embed.setURL('https://dat1mew.com/')
                    Embed.setAuthor('Dat1Mew', 'https://i.redd.it/asdbnr8yy4p51.jpg', 'https://dat1mew.com/')
                    Embed.setDescription('Shows all *working* commands for Ur Mom Bot')
                    Embed.addField('Hide', 'Hides all channels from all users', true)
                    Embed.addField('Hideone', 'Hides all channels except for the one you are currently in', true)
                    Embed.addField('Show', 'Restores channel viewing for all users, **Warning** This shows **ALL** channels.', true)
                    Embed.addField('Guilds', 'Shows the number of guilds the bot is currently in', true)
                    Embed.setThumbnail('https://i.redd.it/asdbnr8yy4p51.jpg')
                    Embed.setTimestamp()
                    Embed.setFooter('updated as of: 2/11/22 at 10:52 PM cst', 'https://i.redd.it/asdbnr8yy4p51.jpg')
                    msg.channel.send(Embed)
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;

                
        case "Ping":
            msg.channel.send("Commnad Recieved")
            break;
        }
    }
});



bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));

bot.login(config.token);