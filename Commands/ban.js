const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));
        
        if(!banUser) return message.channel.send("Deze gebruiker zit niet in deze server");

        var reason = args.join(" ").slice(22);

        if(!reason) return message.channel.send("Geef een reden op.");
        
        if(message.guild.member(args) == 0) return;
        
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Jij hebt geen rechten om dit te doen");

        if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Je mag deze persoon niet banen");

        var ban = new discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#ee0000")
        .addField("Verbande gebruiker", banUser)
        .addField("Gebant door", message.author)
        .addField("Reden", reason)

        var banChannel = message.guild.channels.find(`name`, "logboek");
        if(!banChannel) return message.channel.send("Kan het logboek niet vinden");

        message.guild.member(banUser).ban(reason);

        banChannel.send(ban);

        return

}

module.exports.help = {
    name: "ban"
}