const Discord = require('discord.js');


module.exports = {

    name: "beijar",
    description: "Beija a pessoa mencionada",
    usage: "[usuário]",
    aliases: ["kiss"],


    run: async (client, message, args) => {

    var list = [
      'https://i.imgur.com/IY5GHIo.gif',
      'https://i.imgur.com/dmmOSnN.gif',
      'https://i.imgur.com/VOeFBLO.gif',
      'https://i.imgur.com/DfzPVQG.gif',
      'https://i.imgur.com/5tnonK1.gif',
      'https://i.imgur.com/s7ko0WY.gif',
      'https://i.imgur.com/cWsiKtr.gif',
      'https://i.imgur.com/V9MvoQw.gif',
      'https://i.imgur.com/ENV2HWb.gif',
      'https://i.imgur.com/9DiIe1W.gif',
      'https://i.imgur.com/T3tLosc.gif',
      'https://i.imgur.com/NCY3h56.gif',
      'https://i.imgur.com/XURvcSe.gif',
      'https://i.imgur.com/4UQXQnv.gif',
      'https://i.imgur.com/P6dU8GA.gif',
      'https://i.imgur.com/fI3z0Wy.gif',
      'https://i.imgur.com/mhxykcY.gif',
      'https://i.imgur.com/RWLy38M.gif',
      'https://i.imgur.com/NmRqxau.gif',
      'https://i.imgur.com/Uh0UOMs.gif',
      'https://i.imgur.com/zBqxFnB.gif',
      'https://i.imgur.com/UdDgZdr.gif',
      'https://i.imgur.com/3t6KZGz.gif',
      'https://i.imgur.com/uiMsiDJ.gif',
      'https://i.imgur.com/gB8WXdJ.gif',
      'https://i.imgur.com/8SRiYO0.gif',
      'https://i.imgur.com/vScTlaf.gif',
      'https://i.imgur.com/1B0LMxf.gif'
    ];

    var rand = list[Math.floor(Math.random() * list.length)];
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (user == client.user) return message.channel.send("🙅‍♀️ **|** Nah, eu não quero te beijar!")
    if (!user) {
      return message.channel.send('lembre-se de mencionar um usuário válido para beijar!');
    }

    let avatar = message.author.displayAvatarURL({format: 'png'});
    const embed = new Discord.MessageEmbed()
      .setTitle('Kiss')
      .setColor('#0096ff')
      .setDescription(`${message.author} **beijou** ${user}`)
      .setImage(rand)
      .setThumbnail(avatar)
      .setTimestamp()
      .setFooter('Reaja com 😘 para retribuir')
      .setTimestamp().setAuthor(message.author.tag, avatar);
    await message.channel.send(`${message.author}`, embed).then((msg) => {
      msg.react('😘')

      const filter = (reaction, usuario) => reaction.emoji.name === '😘' && usuario.id === user.id;

      const collector = msg.createReactionCollector(filter, { max: 1, time: 60000 });
      collector.on('collect', () => {
        const repeat = new Discord.MessageEmbed()
          .setTitle('Kiss')
          .setColor('#0096ff')
          .setDescription(`😽 ${user} **Beijou** ${message.author}`)
          .setThumbnail(avatar)
          .setImage(rand)
          .setTimestamp()
          .setAuthor(message.author.tag, avatar);

        message.channel.send(repeat)
      })

    })

  },
};