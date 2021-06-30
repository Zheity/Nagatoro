const Discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild");
module.exports = {
  name: "dev",
  description: "Comandos de Desenvolvedor Nagatoro!",
  usage: "[dev]",
  aliases: ["developer"],

  run: async (client, message, args) => {
    if (
      message.author.id === "332328470380019713" ||
      message.author.id === "786941260971376650"
    ) {
      if (args[0] == "getinvite") {
        const args = message.content.split(" ").slice(1);
        let guild = client.guilds.cache.get(args[1]);

        if (!guild)
          return message.reply(
            "O bot não está na guilda com este ID ou você não inseriu o id corretamente!"
          );

        let invitechannels = guild.channels.cache.filter((c) =>
          c.permissionsFor(guild.me).has("ADMINISTRATOR")
        );
        if (!invitechannels)
          return message.channel.send(
            "Nenhum canal encontrado com permissão para criar convites!"
          );

        invitechannels
          .random()
          .createInvite()
          .then((invite) =>
            message.channel.send(
              "Aqui está o convite:\nhttps://discord.gg/" + invite.code
            )
          );
      }

      if (args[0] == "servlist") {
        const guilds = client.guilds.cache.array();

        /**
         * Starta as Guilds.
         * @param {number} start 
         */
        const generateEmbed = (start) => {
          const current = guilds.slice(start, start + 10);


          const embed = new Discord.MessageEmbed()
            .setColor('#00aeef')
            .setTitle(
              `Lista de Servers ${start + 1}-${start + current.length} de ${
                guilds.length
              }`
            );
          current.forEach((g) =>
            embed.addField(
              g.name,
              `**ID:** ${g.id}
    **Dono:** ${g.owner.user.tag}\n**Membros:** ${
                g.members.cache.filter((member) => !member.user.bot).size
              }`
            )
          );
          return embed;
        };

        const author = message.author;

        message.channel.send(generateEmbed(0)).then((message) => {

          if (guilds.length <= 10) return;

          message.react("➡️");
          const collector = message.createReactionCollector(

            (reaction, user) =>
              ["⬅️", "➡️"].includes(reaction.emoji.name) &&
              user.id === author.id,

            { time: 60000 }
          );

          let currentIndex = 0;
          collector.on("collect", (reaction) => {
            message.reactions.removeAll().then(async () => {
              reaction.emoji.name === "⬅️"
                ? (currentIndex -= 10)
                : (currentIndex += 10);ed
              message.edit(generateEmbed(currentIndex));
              if (currentIndex !== 0) await message.react("⬅️");
              if (currentIndex + 10 < guilds.length) message.react("➡️");
            });
          });
        });
      }
    }
  },
};
