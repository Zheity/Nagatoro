const discord = require("discord.js");

module.exports = {
    info: {
        name: "sair",
        description: "Sai do canal de voz",
        usage: "",
        aliases: ["leave"],
    },

    run: async function (client, message, args) {
        let embed = new discord.MessageEmbed()
        .setDescription("Adeus!")
        .setColor("#00aeef")
        .setFooter(`Pedido por ${message.author.username}`)
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("**❌Você precisa estar em um canal de voz**");

        await voiceChannel.leave();
        await message.channel.send(embed);
    }
}