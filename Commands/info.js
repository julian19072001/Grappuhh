const discord = require("discord.js");
const package = require("C:/Users/julia/Desktop/tutorial bot/package.json");

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

        var botEmbed = new discord.RichEmbed()
        .setDescription("Bot informatie.")
        .setColor("#29e53f")
        .setThumbnail(botIcon)
        .addField("Bot naam", bot.user.username)
        .addField("Gemaakt op", bot.user.createdAt)
        .addField("Maker", package.author);

        message.channel.send(botEmbed);

        return

}

module.exports.help = {
    name: "info"
}