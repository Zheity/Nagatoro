const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "tocandoagora",
    description: "Para mostrar a música que está tocando no momento",
    usage: "",
    aliases: ["nowplaying","np"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("❌┋Não há nada tocando.**", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Tocando Agora", "https://cdn.discordapp.com/attachments/850523172356620312/851940388147167312/Music.gif")
      .setThumbnail(song.img)
      .setColor("#0096ff")
      .addField("Nome", song.title, true)
      .addField("Duração", song.duration, true)
      .addField("Pedido por", song.req, true)
      .setFooter(`Visualizações: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
}