const Discord = require("discord.js");
const ms = require('ms');
const Guild = require("../database/Schemas/Guild");

module.exports = {
  info: {
    name: "finalizar",
    description: "Para terminar um sorteio",
    usage: "",
    aliases: ["end"],
  },

  run: async function (client, message, args) {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        const semPerm = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Nagatoro Music | Sistema de Sorteios')
        .addField('<a:unchecked:859371442546409512>  `Você precisa ter permissão para finalizar sorteios.`', "** **")
        .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
         return message.channel.send(semPerm);
    }
    if(!args[0]){
        const idErrado = new Discord.MessageEmbed()
        .setColor('#0096ff')
        .setTitle('Nagatoro Music | Sistema de Sorteios')
        .addField('<a:setavermelha:851271661696319518>  `Você precisa especificar uma Mensagem ID válido!`', "** **")
        .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        return message.channel.send(idErrado);
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        const sorteioN = new Discord.MessageEmbed()
        .setColor('#0096ff')
        .setTitle('Nagatoro Music | Sistema de Sorteios')
        .addField('`❔`  **Não consigo encontrar o sorteio com o ID:** `' + args.join(' ') + '`', "** **")
        .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        return message.channel.send(sorteioN);
    }
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        // Sorteio finalizado com sucesso
        const sorteioF = new Discord.MessageEmbed()
        .setColor('#0096ff')
        .setTitle('Nagatoro Music | Sistema de Sorteios')
        .addField('<a:warn:859378191139471370>  `O sorteio terminará em menos de` `'+(client.giveawaysManager.options.updateCountdownEvery/1000)+'` `segundos...`', "** **")
        .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
        message.channel.send(sorteioF);
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID + ${giveaway.messageID} + is already ended.`)){
            message.channel.send('**Esse sorteio já foi finalizado!**');
        } else {
            const channelLogs = client.channels.cache.find(channel => channel.name === '💣・métodos')
            channelLogs.send(e)
            console.error(e);
            const sError = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Nagatoro Music | Sistema de Sorteios')
            .addField('<a:warn:859378191139471370>  `Aconteceu um erro ao tentar finalizar o sorteio...`', "** **")
            .setFooter("Nagatoro Music © Todos os direitos reservados.", message.guild.iconURL());
            message.channel.send(sError);
        }
    });

  },
};