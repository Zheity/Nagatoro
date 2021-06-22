const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const fs = require('fs');


module.exports = {
  info: {
    name: "afk",
    description: "para manter o bot no canal de voz 24 horas por dia, 7 dias por semana",
    usage: "",
    aliases: ["afk"],
  },

  run: async function (client, message, args) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
    if(!message.member.hasPermission('MANAGE_SERVER'))return sendError("Você não tem permissão para usar este comando", message.channel);
    if (!afk[message.guild.id]) afk[message.guild.id] = {
      afk: false,
    };
    var serverQueue = afk[message.guild.id]
    if (serverQueue) {

      serverQueue.afk = !serverQueue.afk;
      message.channel.send({
        embed: {
          color: "#00aeef",
          description: `💤  **|**  AFK está **\`${serverQueue.afk === true ? "ativo" : "desativo"}\`**`
        }
      });
      return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if (err) console.error(err);
      });
    };
    return sendError("Não há nada tocando.", message.channel);
  },
};