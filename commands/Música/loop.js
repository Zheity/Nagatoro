const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {

    name: "loop",
    description: "Alternar loop de música",
    usage: "",
    aliases: ["loop"],


    run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "#00aeef",
                    description: `🔁  **|**  Loop está **\`${serverQueue.loop === true ? "ativo" : "destivado"}\`**`
                }
            });
        };
    return sendError("Não há nada tocando.", message.channel);
  },
};