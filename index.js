
const Discord = require("discord.js");
const config = require("./config");
const constants = require("./node_modules/discord.js/src/util/Constants.js");
constants.DefaultOptions.ws.properties.$browser = "Discord iOS";
const bot = new Discord.Client();
const exampleEmbed = new Discord.MessageEmbed()
const request = require('request');
var cat = "http://random.cat/meow.php"
const client = require('nekos.life');
const nekoAPI = require("nekos.life");
const neko = new nekoAPI();


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`)
    bot.user.setActivity(`FAttY SPiNS - Doin' Your Mom`, {
        type: "LISTENING"
    })
})




// Ur mom joke
bot.on('message', msg => {
    if (msg.author.bot) return;
    else if (msg.reply('ur mom')) {
    }
})



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
                    exampleEmbed.setColor('#0099ff')
                    exampleEmbed.setTitle('Ur Mom: Help commands')
                    exampleEmbed.setURL('https://dat1mew.com/')
                    exampleEmbed.setAuthor('Dat1Mew', 'https://i.redd.it/asdbnr8yy4p51.jpg', 'https://dat1mew.com/')
                    exampleEmbed.setDescription('Shows all *working* commands for Ur Mom Bot')
                    exampleEmbed.addField('Hide', 'Hides all channels from all users', true)
                    exampleEmbed.addField('Hideone', 'Hides all channels except for the one you are currently in', true)
                    exampleEmbed.addField('Show', 'Restores channel viewing for all users', true)
                    exampleEmbed.addField('Guilds', 'Shows the number of guilds the bot is currently in', true)
                    exampleEmbed.setThumbnail('https://i.redd.it/asdbnr8yy4p51.jpg')
                    exampleEmbed.setTimestamp()
                    exampleEmbed.setFooter('updated as of: 2/11/22 at 10:52 PM cst', 'https://i.redd.it/asdbnr8yy4p51.jpg')
                    msg.channel.send(exampleEmbed)
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


                //Server timeout user for 10 minutes
            case "timeout":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    if (args[0]) {
                        let user = msg.mentions.users.first()
                        if (user) {
                            msg.guild.member(user).roles.add("941862149695868968")
                            msg.channel.send(`${user.tag} has been timed out for 10 minutes!`)
                        } else {
                            msg.channel.send("Please mention a user!")
                        }
                    } else {
                        msg.channel.send("Please mention a user!")
                    }
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;




            // Create role that cant view channels
            case "create":
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    if (args[0]) {
                        let role = msg.guild.roles.cache.find(role => role.name === args[0])
                        if (role) {
                            msg.channel.send("Role already exists!")
                        } else {
                            msg.guild.roles.create({
                                data: {
                                    name: args[0],
                                    color: "#000000",
                                    permissions: []
                                }
                            }).then(role => {
                                msg.channel.send(`Role ${role.name} has been created!`)
                            })
                        }
                    } else {
                        msg.channel.send("Please enter a role name!")
                    }
                } else {
                    msg.channel.send("You do not have permission to use this command!")
                }
                break;




                // List how many guilds the bot is in
            case "guilds":
                msg.channel.send(`I am in ${bot.guilds.cache.size} guilds!`)
                break;




                
        case "Test1":
            client.emit(Events.Message_Create, message)
            setTimeout(() => { message.delete() }, 5000)
            msg.channel.send("Commnad Recieved")
            break;
        }
    }
});

// TODO: FIGURE OUT HOW TO FIX IMAGE URL - Image Url is borked shit dont work lol
// Embed looks nice, embeds are weird. 
// Todo: Add TheCatApi(tm)


bot.login(config.token);