const discord = require("discord.js");
const ms = require("ms"); 

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij bent niet bevoegd om mensen te muten.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if(!user) return message.channel.send("Deze gebruiker zit niet in deze server.");
    
    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan deze persoon geen mute geven");

    var muteChannel = message.guild.channels.find(`name`, "logboek");
    if(!muteChannel) return message.channel.send("Kan het logboek niet vinden");

    var muteRole = message.guild.roles.find("name", "muted");

    if(!muteRole) return message.channel.send("De rol (muted) bestaat niet dus er kunnen geen mensen gemute worden."); 

    var muteTime = args[1];

    var reason = args[2];

    if(!reason) return message.channel.send("Geef een reden op.");

    if (!muteTime) return message.channel.send("Geef de tijd van mute mee."); 

    await (user.addRole(muteRole.id));

    var mute = new discord.RichEmbed()
        .setDescription("Mute")
        .setColor("#ee0000")
        .addField("Gemuten gebruiker", user)
        .addField("Gemute door", message.author)
        .addField("Reden", reason)

        muteChannel.send(mute);


    setTimeout(function () {

        user.removeRole(muteRole.id);

        if(!user.roles.has(muteRole.id)){ 

        } else {

            muteChannel.send(`${user} is geunmute.`)

        }

    }, ms(muteTime));

}

module.exports.help = {
    name: "mute"
}