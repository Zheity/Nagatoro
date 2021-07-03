const Discord = require('discord.js');


module.exports = {

    name: "rir",
    description: "Ri pessoa mencionada",
    usage: "",
    aliases: ["laugh"],


    run: async (client, message, args) => {

        const user = message.mentions.users.first();
        const sayMessage = args.join(' ');

    var list = [
      'https://i.imgur.com/j7j8s0j.gif',
      'https://i.imgur.com/Z13vwdb.gif',
      'https://i.imgur.com/esy3FAs.gif',
      'https://i.imgur.com/RQl0ClF.gif',
      'https://i.imgur.com/bYQ3vt2.gif',
      'https://i.imgur.com/XU51RMx.gif',
      'https://i.imgur.com/uKRNCLb.gif',
      'https://i.imgur.com/DJCDKml.gif',
      'https://i.imgur.com/iH6H6ay.gif',
      'https://i.imgur.com/qvAi6Sn.gif',
      'https://i.imgur.com/EHpiGbK.gif',
      'https://i.imgur.com/te28p7B.gif',
      'https://i.imgur.com/5RCoozX.gif',
      'https://i.imgur.com/1IAxNJw.gif',
      'https://i.imgur.com/zBH7kno.gif',
      'https://i.imgur.com/rzlKSW4.gif',
      'https://i.imgur.com/SrlfrQs.gif',
      'https://i.imgur.com/qYxySV0.gif',
      'https://i.imgur.com/11lLtuT.gif',
      'https://i.imgur.com/Kif6UpO.gif',
      'https://i.imgur.com/KUMW67P.gif',
      'https://i.imgur.com/YGzKbGa.gif',
      'https://i.imgur.com/eRy3NC3.gif'
    ];
    
    var rand = list[Math.floor(Math.random() * list.length)];


if (user) {
        const avatar = message.author.displayAvatarURL({ format: 'png' });
        const embed = new Discord.MessageEmbed()
          .setTitle('laugh')
          .setColor('#0096ff')
          .setDescription(`**${message.author} está rindo de ${user}!**`)
          .setImage(rand)
          .setThumbnail(avatar)
          .setTimestamp()
          .setAuthor(message.author.tag, avatar);
        message.channel.send(embed);
      } else {
    const avatar = message.author.displayAvatarURL({ format: 'png' });
    const embed = new Discord.MessageEmbed()
      .setTitle('laugh')
      .setColor('#0096ff')
      .setDescription(`**${message.author} está rindo ${sayMessage}**`)
      .setImage(rand)
      .setThumbnail(avatar)
      .setTimestamp()
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(embed);
    }
  },

  };