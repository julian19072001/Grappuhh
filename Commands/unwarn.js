const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warning.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij bent niet bevoegd om mensen te warnen.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if(!user) return message.channel.send("Deze gebruiker zit niet in deze server.");
    
    if(!warns[user.id]) return message.channel.send(`${user} heeft geen warnings.`);

    if(warns[user.id].warns < 1) return message.channel.send(`${user} heeft geen warnings.`);
    
    warns[user.id].warns--;

    fs.writeFile("./warning.json", JSON.stringify(warns), (err) =>{
        if(err) console.log(err);
    });

    var unwarnEmbed = new discord.RichEmbed()
        .setDescription("Unwarn")
        .setColor("#00ee00")
        .addField("Gewarnde gebruiker", user)
        .addField("Huidig aantal warnings", warns[user.id].warns)
        .addField("Gewarned door", message.author)

        var unwarnChannel = message.guild.channels.find(`name`, "logboek");
        if(!unwarnChannel) return message.channel.send("Kan het logboek niet vinden");

        unwarnChannel.send(unwarnEmbed);

}

module.exports.help = {
    name: "unwarn"
}