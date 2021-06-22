const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pularpara",
    description: "Pule para o número da fila selecionado",
    usage: "pularpara <numero>",
    aliases: ["skipto"],
  },

  run: async function (client, message, args) {
    if (!args.length || isNaN(args[0]))
      return message.channel.send({
                        embed: {
                            color: "#0096ff",
                            description: `**Usar**: \`${client.config.prefix}pularpara <numero>\``
                        }
   
                   }).catch(console.error);
        

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("Não há fila.",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return sendError(`A fila é só ${queue.songs.length} Músicas longas!`,message.channel).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
       return sendError(`:notes: Alguem parou a música e a fila foi limpa.: ${error}`, message.channel);
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "#0096ff",
                            description: `${message.author} ⏭ pulado \`${args[0] - 1}\` Músicas`
                        }
   
                   }).catch(console.error);
                   message.react("✅")

  },
};