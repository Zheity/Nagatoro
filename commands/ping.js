const discord = require('discord.js');
module.exports = {
    info: {
        name: "ping",
        description: "Para ver a latência do bot",
        usage: "",
        aliases: ["ping"],
    },

    run: async function (client, message, args) {
        let embed = new discord.MessageEmbed()
        .setDescription(`Pong - ${client.ws.ping}ms`)
        .setColor("BLUE")
        .setFooter(`Pedido por ${message.author.username}`)

        message.channel.send(embed)
    },
}