const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "remover",
    description: "Remover música da fila",
    usage: "<numero>",
    aliases: ["remove"],
  },

  run: async function (client, message, args) {
   const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("Não há fila.",message.channel).catch(console.error);
    if (!args.length) return sendError(`Usar ${client.config.prefix}\`remover <Número da fila>\``);
    if (isNaN(args[0])) return sendError(`Usar: ${client.config.prefix}\`remover <Número da fila>\``);
    if (queue.songs.length == 1) return sendError("Não há fila.",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return sendError(`A fila tem apenas ${queue.songs.length} músicas longas!`,message.channel).catch(console.error);
try{
    const song = queue.songs.splice(args[0] - 1, 1); 
    sendError(`❌ **|** removido: **\`${song[0].title}\`** da fila.`,queue.textChannel).catch(console.error);
                   message.react("✅")
} catch (error) {
        return sendError(`**:notes: Ocorreu um erro inesperado. \nTipo possível: ${error}**`, message.channel);
      }
  },
};