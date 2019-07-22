const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij bent niet bevoegd om mensen te muten.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if(!user) return message.channel.send("Deze gebruiker zit niet in deze server.");

    var unmuteChannel = message.guild.channels.find(`name`, "logboek");

    if(!unmuteChannel) return message.channel.send("Kan het logboek niet vinden");

    var muteRole = message.guild.roles.find("name", "muted");

    if(!muteRole) return message.channel.send("De rol (muted) bestaat niet dus er kunnen geen mensen gemute zijn.");

    var unmute = new discord.RichEmbed()
        .setDescription("Vervroegde unmute")
        .setColor("#00ee00")
        .addField("Gemuten gebruiker", user)
        .addField("Geunmute door", message.author)

        unmuteChannel.send(unmute);

}

module.exports.help = {
    name: "unmute"
}