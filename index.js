
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



// Ur mom message spam
bot.on('message', msg => {
    if (msg.author.bot) return;
    else if (msg.reply('ur mom')) {
    }
})


// Gerneric 
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
                    Embed.addField('Show', 'Restores channel viewing for all users', true)
                    Embed.addField('Guilds', 'Shows the number of guilds the bot is currently in', true)
                    Embed.setThumbnail('https://i.redd.it/asdbnr8yy4p51.jpg')
                    Embed.setTimestamp()
                    Embed.setFooter('updated as of: 2/11/22 at 10:52 PM cst', 'https://i.redd.it/asdbnr8yy4p51.jpg')
                    msg.channel.send(Embed)
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;

            // Show all channels
            case "show":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    msg.guild.channels.cache.forEach(channel => {
                        channel.updateOverwrite(msg.guild.roles.everyone, {
                            VIEW_CHANNEL: true
                        })
                    })
                    msg.channel.send("All channels have been shown!")
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;

                //Hide all channels except for the current channel
            case "hideone":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    msg.guild.channels.cache.forEach(channel => {
                        if (channel.id != msg.channel.id) {
                            channel.updateOverwrite(msg.guild.roles.everyone, {
                                VIEW_CHANNEL: false
                            })
                        }
                    })
                    msg.channel.send("All channels have been hidden!")
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;

                // List how many guilds the bot is in
            case "guilds":
                msg.channel.send(`I am in ${bot.guilds.cache.size} guilds!`)
                break;

                
        case "Ping":
            msg.channel.send("Commnad Recieved")
            break;
        }
    }
});

// TODO: FIGURE OUT HOW TO FIX IMAGE URL - Image Url is borked shit dont work lol
// Embed looks nice, embeds are weird. 
// Todo: Add TheCatApi(tm)


bot.login(config.token);