const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
        
        if(!kickUser) return message.channel.send("Deze gebruiker zit niet in deze server");

        var reason = args.join(" ").slice(22);

        if(!reason) return message.channel.send("Geef een reden op.");

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Jij hebt geen rechten om dit te doen");

        if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Je mag deze persoon niet kicken");

        var kick = new discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#ee0000")
        .addField("Gekickte gebruiker", kickUser)
        .addField("Gekickt door", message.author)
        .addField("Reden", reason)

        var kickChannel = message.guild.channels.find(`name`, "logboek");
        if(!kickChannel) return message.channel.send("Kan het logboek niet vinden");

        message.guild.member(kickUser).kick(reason);

        kickChannel.send(kick);

        return

}

module.exports.help = {
    name: "kick"
}