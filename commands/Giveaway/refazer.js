const Discord = require("discord.js");
const ms = require('ms');

module.exports = {

    name: "refazer",
    description: "refazer o sorteio para escolher novos ganhadores",
    usage: "[ID do sorteio]",
    aliases: ["reroll"],


    run: async (client, message, args) => {

        // Membro sem permissão
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            const rerollSorteios = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Nagatoro Music | Sistema de Sorteios')
                .addField('<a:unchecked:859371442546409512>  `Você precisa ter permissão para refazer sorteios.`', "** **")
                .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
            return message.channel.send(rerollSorteios);
        }
        // Não especificou uma mensagem ID válida
        if (!args[0]) {
            const mencionar = new Discord.MessageEmbed()
                .setColor('#0096ff')
                .setTitle('Nagatoro Music | Sistema de Sorteios')
                .addField('<a:setavermelha:851271661696319518>  `Você precisa especificar uma Mensagem ID válido!`', "** **")
                .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
            return message.channel.send(mencionar);
        }
        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // Não conseguiu encontrar o sorteio
        if (!giveaway) {
            const encontrarS = new Discord.MessageEmbed()
                .setColor('#0096ff')
                .setTitle('Nagatoro Music | Sistema de Sorteios')
                .addField('`❔` **Não consigo encontrar o sorteio com o ID:** `' + args.join(' ') + '`', "** **")
                .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
            return message.channel.send(encontrarS);
        }
        // Refazer o sorteio
        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                // Sorteio refeito com sucesso!
                const refazerS = new Discord.MessageEmbed()
                    .setColor('#0096ff')
                    .setTitle('Nagatoro Music | Sistema de Sorteios')
                    .addField("<a:checked:859377695137726494>  `Sorteio refeito com sucesso!`", "** **")
                    .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
                message.channel.send(refazerS);
            })
            .catch((e) => {
                if (e.startsWith(`Sorteio com o ID de mensagem ${giveaway.messageID} ainda não foi finalizado.`)) {
                    message.channel.send('Este sorteio não foi encerrado ainda!');
                } else {
                    console.error(e);
                    const sError = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Nagatoro Music | Sistema de Sorteios')
                        .addField('<a:warn:859378191139471370>  `Aconteceu um erro ao tentar refazer o sorteio.`', "** **")
                        .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
                    message.channel.send(sError);
                }
            });

  },
};