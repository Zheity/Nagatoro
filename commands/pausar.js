const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pausar",
    description: "Para pausar a música atual",
    usage: "",
    aliases: ["pause"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: As músicas terminaram e a fila foi limpa.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Pausou a música!")
      .setColor("#0096ff")
      .setTitle("A música foi pausada!")
      return message.channel.send(xd);
    }
    return sendError("Não há nada tocando.", message.channel);
  },
};