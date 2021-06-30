const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {

    name: "pular",
    description: "Para pular a música atual",
    usage: "",
    aliases: ["skip"],


    run: async (client, message, args) => {
    const channel = message.member.voice.channel
    if (!channel)return sendError("**❌┋Você precisa entrar em um canal de voz para tocar uma música.!**", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("**❌┋Não há nada reproduzindo que eu pudesse pular para você.**", message.channel);
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Retomou a música!")
      .setColor("#0096ff")
      .setTitle("A música foi retomada!")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`**:notes: Alguem parou a música e a fila foi limpa.: ${error}**`, message.channel);
      }
    message.react("✅")
  },
};