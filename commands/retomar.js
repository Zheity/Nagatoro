const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "retomar",
    description: "Para retomar a música pausada",
    usage: "",
    aliases: ["resume"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      serverQueue.connection.dispatcher.pause(true);
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Retomou a Música!")
      .setColor("#00aeef")
      .setAuthor("A música foi retomada!", "https://cdn.discordapp.com/attachments/850523172356620312/851940388147167312/Music.gif")
      return message.channel.send(xd);
    }
    return sendError("Não há nada tocando.", message.channel);
  },
};