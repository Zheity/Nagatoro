const Discord = require('discord.js');

const { NovelCovid } = require('novelcovid');

const track = new NovelCovid()


module.exports = {
  info: {
    name: "covidtotal",
    description: "Mostra as estatisticas do covid no covidmundo",
    usage: "",
    aliases: ["covidtotal"],
  },

  run: async function (client, message, args) {

    const corona = await track.all();


        const embed = new Discord.MessageEmbed()
        .setTitle(`Mundial`)
        .setDescription(`Informações sobre COVID-19`)
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