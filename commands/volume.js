const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "Para alterar o volume da fila de músicas do servidor",
    usage: "[volume]",
    aliases: ["volume"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("**❌┋Você precisa entrar em um canal de voz para tocar uma música!**", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Não há nada tocando.", message.channel);
    if (!args[0])return message.channel.send(`🔊┋O volume atual é: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send('**:notes: Apenas números!**').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('You can\'t set the volume more than 150. or lower than 0',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Ajustei o volume para: **${args[0]/1}/100**`)
    .setAuthor("Gerenciamento de volume", "https://cdn.discordapp.com/attachments/850523172356620312/851940388147167312/Music.gif")
    .setColor("#0096ff")
    return message.channel.send(xd);
  },
};