const { MessageEmbed } = require('discord.js')

module.exports = {

    name: "votar",
    description: "Para votar no bot",
    usage: "",
    aliases: ["vote", "vt"],


    run: async (client, message, args) => {

    let avatar = message.author.displayAvatarURL({format: 'png'});

    const votar = new MessageEmbed()
    .setAuthor("Nagatoro Music")
    .setThumbnail(avatar)
    .setDescription(`**Ajude a Nagatoro Music votando nele!**\n\n*Para votar clique nos links abaixo:*\n\n **Nagatoro Music (top.gg)**: [clique aqui](https://top.gg/bot/842498634822189096/vote)`)
    .setColor("#0096ff")
    .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
message.channel.send(message.author, votar)

  },
};