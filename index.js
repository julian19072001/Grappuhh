const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const package = require("./package.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/" , (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    
    if(jsFiles.length <= 0){
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f,i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`Het bestand ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet)

    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity(botConfig.playing, {type: "PLAYING"});

});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", botConfig.defaultrole);
    var logboek = member.guild.channels.find(`name`, "logboek");

    if(!role){
        logboek.send(`Er is een nieuwe member gejoint maar de default rank ${botConfig.defaultrole} bestaat niet`)
        return;
        }
    member.addRole(role);

    const channel = member.guild.channels.find("name", botConfig.join_leavechannel);

    if (!channel) return;

    channel.send(botConfig.join_message1 + member + botConfig.join_message2);
});

bot.on("guildMemberRemove", member => {
    const channel = member.guild.channels.find("name", botConfig.join_leavechannel);

    if (!channel) return;

    channel.send(botConfig.leave_message1 + member + botConfig.leave_message2);
});

bot.on("message", async message => {

    if (message.author.bot) return;

    if(message.channel.type === "dm") return;


    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    var helpCommand = botConfig.helpcommand;

    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot, message, args, prefix);

});


bot.login(botConfig.token);