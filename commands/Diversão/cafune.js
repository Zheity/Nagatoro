const Discord = require('discord.js');


module.exports = {

    name: "cafune",
    description: "faz cafuné pessoa mencionada",
    usage: "[usuário]",
    aliases: ["pat"],


    run: async (client, message, args) => {

    var list = [
      'https://i.imgur.com/KeL10HJ.gif',
      'https://i.imgur.com/x9E2NAp.gif',
      'https://i.imgur.com/RRYw7PY.gif',
      'https://i.imgur.com/6sF3RO0.gif',
      'https://i.imgur.com/cQRutTD.gif',
      'https://i.imgur.com/I9eRmxh.gif',
      'https://i.imgur.com/BALSrik.gif',
      'https://i.imgur.com/ffm98kG.gif',
      'https://i.imgur.com/sGzQxG2.gif',
      'https://i.imgur.com/td4f9v4.gif',
      'https://i.imgur.com/GUeJt28.gif',
      'https://i.imgur.com/o9EbkhY.gif',
      'https://i.imgur.com/rZXTJvk.gif',
      'https://i.imgur.com/m4NYA7w.gif',
      'https://i.imgur.com/39Z84Oi.gif',
      'https://i.imgur.com/FZDlJqK.gif',
      'https://i.imgur.com/p1W20N0.gif',
      'https://i.imgur.com/BUIhGsH.gif',
      'https://i.imgur.com/d1tliif.gif',
      'https://i.imgur.com/hnFFkMe.gif',
      'https://i.imgur.com/5LndvcI.gif',
      'https://i.imgur.com/b7OpRrb.gif',
      'https://i.imgur.com/qNUo6XN.gif',
      'https://i.imgur.com/hs810Vz.gif',
      'https://i.imgur.com/yi7Wrio.gif',
      'https://i.imgur.com/hWmf8G4.gif'
    ];
    
    var rand = list[Math.floor(Math.random() * list.length)];

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return message.channel.send('lembre-se de mencionar um usuário válido para cafuné!');
    }

    const avatar = message.author.displayAvatarURL({ format: 'png' });
    const embed = new Discord.MessageEmbed()
      .setTitle('Pat')
      .setColor('#0096ff')
      .setDescription(`${message.author} **Fez cafuné em** ${user}`)
      .setImage(rand)
      .setTimestamp()
      .setThumbnail(avatar)
      .setFooter('Reaja com 🤩 para retribuir')
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(`${message.author}`, embed).then((msg) => {
      msg.react('🤩')

      const filter = (reaction, usuario) => reaction.emoji.name === '🤩' && usuario.id === user.id;

      const collector = msg.createReactionCollector(filter, { max: 1, time: 60000 });
      collector.on('collect', () => {
        const repeat = new Discord.MessageEmbed()
          .setTitle('Pat')
          .setColor('#0096ff')
          .setDescription(`${user} **Fez cafuné** ${message.author}`)
          .setThumbnail(avatar)
          .setTimestamp()
          .setImage(rand)
          .setAuthor(message.author.tag, avatar);

        message.channel.send(repeat)
      })

    })

  },
};