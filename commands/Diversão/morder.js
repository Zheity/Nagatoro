const Discord = require('discord.js');


module.exports = {

    name: "morder",
    description: "Morde a pessoa mencionada",
    usage: "[usuário]",
    aliases: ["bite"],


    run: async (client, message, args) => {

      var list = [
        'https://i.imgur.com/3jBRqpj.gif',
        'https://i.imgur.com/I9DvtZs.gif',
        'https://i.imgur.com/HbbvWwU.gif',
        'https://i.imgur.com/KVcYcIU.gif',
        'https://i.imgur.com/tGkaAaM.gif',
        'https://i.imgur.com/N0fvVab.gif',
        'https://i.imgur.com/ySQ13ft.gif',
        'https://i.imgur.com/mTBasiO.gif',
        'https://i.imgur.com/KDPNND3.gif',
        'https://i.imgur.com/9CTSnq4.gif',
        'https://i.imgur.com/9OEEkPF.gif',
        'https://i.imgur.com/uOKnNei.gif',
        'https://i.imgur.com/AvJvnuq.gif',
        'https://i.imgur.com/SuYbWA1.gif',
        'https://i.imgur.com/aQp2XHJ.gif',
        'https://i.imgur.com/40z1Ij2.gif',
        'https://i.imgur.com/mcmmARM.gif',
        'https://i.imgur.com/4WwRyFZ.gif',
        'https://i.imgur.com/8iS63YV.gif'
      ];
    
    var rand = list[Math.floor(Math.random() * list.length)];

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return message.channel.send('Lembre-se de mencionar um usuário válido para morder!');
    }

    const avatar = message.author.displayAvatarURL({ format: 'png' });
    const embed = new Discord.MessageEmbed()
      .setTitle('bite')
      .setColor('#0096ff')
      .setDescription(`${message.author} **mordeu** ${user}`)
      .setImage(rand)
      .setThumbnail(avatar)
      .setTimestamp()
      .setFooter('Reaja com 😼 para retribuir')
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(`${message.author}`, embed).then((msg) => {
      msg.react('😼')

      const filter = (reaction, usuario) => reaction.emoji.name === '😼' && usuario.id === user.id;

      const collector = msg.createReactionCollector(filter, { max: 1, time: 60000 });
      collector.on('collect', () => {
        const repeat = new Discord.MessageEmbed()
          .setTitle('bite')
          .setColor('#0096ff')
          .setDescription(`${user} **mordeu** ${message.author}`)
          .setImage(rand)
          .setThumbnail(avatar)
          .setTimestamp()
          .setAuthor(message.author.tag, avatar);

        message.channel.send(repeat)
      })

    })

  },
};