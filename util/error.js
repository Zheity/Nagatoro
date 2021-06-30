const { MessageEmbed } = require("discord.js")

/**
 * 
 * @param {String} text - Mensagem para ser enviada
 * @param {TextChannel} channel - Um Channel para enviar erro
 */
module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("#0096ff")
    .setDescription(text)
    await channel.send(embed)
}