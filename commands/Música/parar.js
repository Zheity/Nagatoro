const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {

    name: "parar",
    description: "Para parar a música e limpar a fila",
    usage: "",
    aliases: ["stop"],


    run: async (client, message, args) => {
    const channel = message.member.voice.channel
    if (!channel)return sendError("**❌┋Você precisa entrar em um canal de voz para tocar uma música!**", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("**❌┋Não há nada tocando que eu pudesse parar!**", message.channel);
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: Agluem parou a música e a fila foi limpa.: ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅")
  },
};