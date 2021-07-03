const Discord = require('discord.js');


module.exports = {

    name: "lamber",
    description: "lambe a pessoa mencionada",
    usage: "[usuário]",
    aliases: ["lick"],


    run: async (client, message, args) => {

    var list = [
      'https://i.imgur.com/MHS0QvI.gif',
      'https://i.imgur.com/6xPO2Ww.gif',
      'https://i.imgur.com/kfP0MJk.gif',
      'https://i.imgur.com/x1cHr6u.gif',
      'https://i.imgur.com/G4crOSL.gif',
      'https://i.imgur.com/c8bI3mJ.gif',
      'https://i.imgur.com/FMGbFxX.gif',
      'https://i.imgur.com/8wsNDQT.gif',
      'https://i.imgur.com/comR9xS.gif',
      'https://i.imgur.com/dMxsLNw.gif',
      'https://i.imgur.com/KXrnod3.gif',
      'https://i.imgur.com/79lSjE7.gif',
      'https://i.imgur.com/xT1y4xi.gif',
      'https://i.imgur.com/BUWkSLd.gif',
      'https://i.imgur.com/BX1tQp9.gif',
      'https://i.imgur.com/YnBSTvv.gif',
      'https://i.imgur.com/9qaKD7n.gif',
      'https://i.imgur.com/I2OdYel.gif',
      'https://i.imgur.com/Gf9MQuG.gif'
    ];
    
    var rand = list[Math.floor(Math.random() * list.length)];

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return message.channel.send('lembre-se de mencionar um usuário válido para lamber!');
    }

    const avatar = message.author.displayAvatarURL({ format: 'png' });
    const embed = new Discord.MessageEmbed()
      .setTitle('lick')
      .setColor('#0096ff')
      .setDescription(`${message.author} **lambeu** ${user}`)
      .setImage(rand)
      .setThumbnail(avatar)
      .setTimestamp()
      .setTimestamp()
      .setFooter('Reaja com 😝 para retribuir')
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(`${message.author}`, embed).then((msg) => {
      msg.react('😝')

      const filter = (reaction, usuario) => reaction.emoji.name === '😝' && usuario.id === user.id;

      const collector = msg.createReactionCollector(filter, { max: 1, time: 60000 });
      collector.on('collect', () => {
        const repeat = new Discord.MessageEmbed()
          .setTitle('lick')
          .setColor('#0096ff')
          .setDescription(`${user} **lambeu** ${message.author}`)
          .setImage(rand)
          .setThumbnail(avatar)
          .setTimestamp()
          .setAuthor(message.author.tag, avatar);

        message.channel.send(repeat)
      })

    })

  },
};