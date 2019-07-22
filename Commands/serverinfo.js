const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var icon = message.guild.iconURL;

        var serverEmbed = new discord.RichEmbed()
        .setDescription("Server informatie.")
        .setColor("#29e53f")
        .setThumbnail(icon)
        .addField("Server naam", message.guild.name)
        .addField("Totaal aantal leden", message.guild.memberCount)
        .addField("Gemaakt op", message.guild.createdAt)        
        .addField("Je bent gejoint op", message.member.joinedAt)

        message.channel.send(serverEmbed);
        
        return

}

module.exports.help = {
    name: "serverinfo"
}