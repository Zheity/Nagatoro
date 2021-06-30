const Discord = require('discord.js');

const { NovelCovid } = require('novelcovid');

const track = new NovelCovid()


module.exports = {

    name: "covid",
    description: "Mostra as estatisticas do covid no país",
    usage: "[país]",
    aliases: ["covid"],


    run: async (client, message, args) => {

    const nothing = new Discord.MessageEmbed()
        .setTitle('Tem de especificar um país')

        const corona = await track.countries(args.join(" "));

        if(!args[0]) return message.channel.send(nothing);


        const embed = new Discord.MessageEmbed()
        .setTitle(`${corona.country}`)
        .setDescription(`Informações sobre COVID-19 em ${corona.country}`)
        .addField('Total Confirmado', corona.cases, true)
        .addField('Total de mortes', corona.deaths, true)
        .addField('Total Recuperado', corona.recovered, true)
        .addField('Casos de hoje', corona.todayCases, true)
        .addField('Mortes de hoje', corona.todayDeaths, true)
        .addField('Casos ativos', corona.active, true)
        .addField('Casos Críticos', corona.critical, true)
        .setFooter(`Obrigado por usar ${client.user.username}`, client.user.displayAvatarURL())

        message.channel.send(embed);

  },
};