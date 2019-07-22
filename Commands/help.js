const discord = require("discord.js");


module.exports.run = async (bot, message, args, prefix) => {

    try{

        var botEmbed = new discord.RichEmbed()
        .setDescription("Command lijst")
        .setColor("#42fff2")
        .addField(`${prefix}info`, "Alle info van deze bot.")
        .addField(`${prefix}serverinfo`, "Alle info van de discord server")
        .addField(`${prefix}clear [aantal]`, "Verwijder een groot aantal berichten in een keer.")
        .addField(`${prefix}warn`, "Waarschuw een gebruiker.")
        .addField(`${prefix}unwarn`, "Unmute een gebruiker.")
        .addField(`${prefix}mute`, "Mute een gebruiker.")
        .addField(`${prefix}unmute`, "Unmute een gebruiker.")
        .addField(`${prefix}kick`, "Kick een gebruiker van de server.")
        .addField(`${prefix}ban`, "Verban iemand van de server.")
        .addField(`${prefix}`, "Dit is een test om te kijken hoe het updaten werkt")
        
        message.author.send(botEmbed);

    }catch (error){
        message.channel.send("Er is iets fout gegaan met het versturen van de commands.")
    }
}

module.exports.help = {
    name: "help"
}