const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warning.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij bent niet bevoegd om mensen te warnen.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if(!user) return message.channel.send("Deze gebruiker zit niet in deze server.");
    
    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan deze persoon geen warn geven");

    var reason = args.join(" ").slice(22);

    if(!reason) return message.channel.send("Geef een reden op.");

    if(!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warning.json", JSON.stringify(warns), (err) =>{
        if(err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("Warn")
        .setColor("#ee0000")
        .addField("Gewarnde gebruiker", user)
        .addField("Totaal aantal gekregen warnings", warns[user.id].warns)
        .addField("Gewarned door", message.author)
        .addField("Reden", reason)

        var warnChannel = message.guild.channels.find(`name`, "logboek");
        if(!warnChannel) return message.channel.send("Kan het logboek niet vinden");

        warnChannel.send(warnEmbed);

        if(warns[user.id].warns % 3 == 0){

        message.guild.member(user).kick(reason);

        message.channel.send(`${user} is gekicked omdat hij/zij teveel warnings.`);
    
        }

}

module.exports.help = {
    name: "warn"
}