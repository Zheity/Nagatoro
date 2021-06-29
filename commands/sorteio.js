const Discord = require("discord.js");
const ms = require('ms');
const Guild = require("../database/Schemas/Guild");

module.exports = {
  info: {
    name: "sorteio",
    description: "Para fazer um sorteio",
    usage: "",
    aliases: ["start"],
  },

  run: async function (client, message, args) {

    if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
        const semPerms = new Discord.MessageEmbed()
            .setColor('#800000')
            .setTitle('Nagatoro Music | Sistema de Sorteios')
            .addField('<a:unchecked:859371442546409512>  `Você não tem permissão para iniciar sorteios.`', "** **")
            .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        return message.channel.send(semPerms);
    }
    let giveawayChannel = message.mentions.channels.first();
    // Não mencionou um canal válido
    if (!giveawayChannel) {
        const mencionar = new Discord.MessageEmbed()
            .setColor('#0096ff')
            .setTitle('Nagatoro Music | Sistema de Sorteios')
            .setThumbnail(message.guild.iconURL())
            .addField('<a:setavermelha:851271661696319518>  **Para fazeres um sorteio escreve:**', "`!sorteio <#canal> <duração> <ganhadores> <prêmio>`")
            .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        return message.channel.send(mencionar);
    }
    let giveawayDuration = args[1];
    // A duração não é válida
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
        const duracao = new Discord.MessageEmbed()
            .setColor('#0096ff')
            .setTitle('Nagatoro Music | Sistema de Sorteios')
            .addField('<a:loading:859371276874416139>  `Você não especificou uma duração válida!`', "**  **")
            .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        return message.channel.send(duracao);
    }
    let giveawayNumberWinners = args[2];
    // Não especificou um número válido de ganhadores
    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
        const ganhadoresnum = new Discord.MessageEmbed()
            .setColor('#0096ff')
            .setTitle('Nagatoro Music | Sistema de Sorteios')
            .addField('<a:loading:859371276874416139>  `Você não especificou um número válido de ganhadores!`', "** **")
            .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        return message.channel.send(ganhadoresnum);
    }
    let giveawayPrize = args.slice(3).join(' ');
    // O prêmio não foi especificado
    if (!giveawayPrize) {
        const premionom = new Discord.MessageEmbed()
            .setColor('#0096ff')
            .setTitle('Nagatoro Music | Sistema de Sorteios')
            .addField('<a:sino:859371241839263755>  `Você não especificou um prêmio!`', "** **")
            .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        return message.channel.send(premionom);
    }
    // Iniciar o sorteio
    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: message.author,
        messages: {
            congrat: "Novos Ganhadores",
            giveaway: (process.env.marcarEveryone === "true" ? "||@everyone||\n" : "") + "",
            giveawayEnded: (process.env.marcarEveryone ==="true"? "||@everyone||\n" : "") + "",
            timeRemaining: "<a:loading:859371276874416139>  **Tempo restante:** `{duration}`",
            inviteToParticipate: "<a:setavermelha:851271661696319518>  **Nagatoro Music** está a sortear `" + giveawayPrize + "`",
            winMessage: "> `🎉` Parabéns, {winners}!" + "\n> `🎁` Você ganhou **{prize}**!",
            embedFooter: "Sistema de Sorteios da Nagatoro Music",
            noWinner: "<a:unchecked:859371442546409512>  `Sorteio cancelado, não teve nenhum participante.`",
            hostedBy: "<a:twitch:859371320119001088>  **Iniciado por:** {user}",
            winners: "ganhadores",
            endedAt: 'Acabou',
            units: {
                seconds: "segundos",
                minutes: "minutos",
                hours: "horas",
                days: "dias",
                pluralS: false
            }
        }
    });

    const sorteioStart = new Discord.MessageEmbed()
        .setColor('#0096ff')
        .setTitle('Nagatoro Music | Sistema de Sorteios')
        .addField('<a:checked:859377695137726494>  **Sorteio iniciado em `' + giveawayChannel.name + "`**", "** **")
        .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
    message.channel.send(sorteioStart);

  },
};