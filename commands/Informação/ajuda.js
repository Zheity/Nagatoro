const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const Guild = require("../../database/Schemas/Guild");

module.exports = {
  name: "ajuda",
  aliases : ['h'],
  description: "Mostra todos os comandos de bot disponíveis.",

  run: async (client, message, args) => {
      const server = await Guild.findOne({ idS: message.guild.id });

      const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Precisa de ajuda? Aqui estão todos os meus comandos::")
        .addFields(categories)
        .setDescription(
          `Use \`${server.prefix}ajuda\` seguido por um nome de comando para obter mais informações adicionais sobre um comando. Por exemplo: \`${server.prefix}ajuda prefixo\`.`
        )
        .setFooter(
          `Pedido por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Comando inválido! Use \`${server.prefix}ajuda\` para ver todos os meus comandos!`)
          .setColor("#00aeef");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Detalhes de Comando:")
        .addField("PREFIX:", `\`${server.prefix}\``)
        .addField(
          "COMANDO:",
          command.name ? `\`${command.name}\`` : "Sem nome para este comando."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Sem ALIASES para este comando."
        )
        .addField(
          "COMO USAR:",
          command.usage
            ? `\`${server.prefix}${command.name} ${command.usage}\``
            : `\`${server.prefix}${command.name}\``
        )
        .addField(
          "DESCRIÇÃO:",
          command.description
            ? command.description
            : "Sem descrição para este comando."
        )
        .setFooter(
          `Pedido por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }

    }
}