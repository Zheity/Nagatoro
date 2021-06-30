const discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Monstra a latência do bot!",
    usage: "ping",
    aliases: ["ping"],

    run: async(client, message) => {
        let embed = new discord.MessageEmbed()
        .setDescription(`Pong - ${client.ws.ping}ms`)
        .setColor("BLUE")
        .setFooter(`Pedido por ${message.author.username}`)

        message.channel.send(embed)
    },
}