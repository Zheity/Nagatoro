const weather = require('weather-js');
const discord = require('discord.js')


module.exports = {
  info: {
    name: "tempo",
    description: "Para ver a temperatura",
    usage: "tempo <páis, cidade>",
    aliases: ["temperature"],
  },

  run: async function (client, message, args) {

    message.delete()
      if(!args.length) {
        return message.channel.send("Por favor, forneça a localização do clima").then(msg => msg.delete({ timeout: 2000 })).catch(() => null)
        message.delete({ timeout: 1000 })
      }
      
   weather.find({search: args.join(" "), lang: 'pt-PT', degreeType: 'C'}, function(err, result) {
  try {
   
  let embed = new discord.MessageEmbed()
  .setTitle(`Clima - ${result[0].location.name}`)
  .setColor("#00aeef")
  .setDescription("As unidades de temperatura podem ser diferentes em algum momento")
  .addField("Temperatura", `${result[0].current.temperature} Celcius`, true)
  .addField("Tempo", result[0].current.skytext, true)
  .addField("Umidade", result[0].current.humidity, true)
  .addField("Velocidade do vento", result[0].current.windspeed, true)
  .addField("Tempo de Observação", result[0].current.observationtime, true)
  .addField("Exibição de vento", result[0].current.winddisplay, true)
  .setThumbnail(result[0].current.imageUrl);
     message.channel.send(embed).then(m => (m.delete({timeout: 100000})));
  } catch(err) {
    return message.channel.send("Não consegui obter os dados dessa determinada localização").then(msg => msg.delete({ timeout: 2000 })).catch(() => null)
  }
  }); 

  },
};