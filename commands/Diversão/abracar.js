const Discord = require('discord.js');


module.exports = {

    name: "abracar",
    description: "abraça a pessoa mencionada",
    usage: "[usuário]",
    aliases: ["hug"],


    run: async (client, message, args) => {

    var list = [
      'https://i.imgur.com/UnJDnBQ.gif',
      'https://i.imgur.com/80yG6An.gif',
      'https://i.imgur.com/kiYkxcH.gif',
      'https://i.imgur.com/X8QQ7lA.gif',
      'https://i.imgur.com/LJYXdcm.gif',
      'https://i.imgur.com/mX0AJDz.gif',
      'https://i.imgur.com/6GzsOGh.gif',
      'https://i.imgur.com/4AzhlqJ.gif',
      'https://i.imgur.com/kWy96YO.gif',
      'https://i.imgur.com/sDydGzs.gif',
      'https://i.imgur.com/x8KbzOL.gif',
      'https://i.imgur.com/NGkxoei.gif',
      'https://i.imgur.com/vhthcMQ.gif',
      'https://i.imgur.com/3JRhOPb.gif',
      'https://i.imgur.com/eVAawPM.gif',
      'https://i.imgur.com/M5is28A.gif',
      'https://i.imgur.com/wSsuPqP.gif',
      'https://i.imgur.com/sQpSChp.gif',
      'https://i.imgur.com/iNJZS7Q.gif',
      'https://i.imgur.com/xE2MILB.gif',
      'https://i.imgur.com/l6Ynwn2.gif',
      'https://i.imgur.com/D1ryJDU.gif',
      'https://i.imgur.com/VUw5Cro.gif',
      'https://i.imgur.com/Y7GXYOp.gif',
      'https://i.imgur.com/WejNzpp.gif',
      'https://i.imgur.com/BHZWxc7.gif',
      'https://i.imgur.com/yfOYtMN.gif',
      'https://i.imgur.com/PntEtAX.gif',
      'https://i.imgur.com/ABKY3O8.gif',
      'https://i.imgur.com/JgDbhpO.gif',
      'https://i.imgur.com/Ev1OYdc.gif',
      'https://i.imgur.com/EPjQB5W.gif',
      'https://i.imgur.com/5ppDeGp.gif',
      'https://i.imgur.com/3KWYz4N.gif',
      'https://i.imgur.com/xDhSCHF.gif',
      'https://i.imgur.com/14maGJF.gif',
      'https://i.imgur.com/p9jsJ3j.gif',
      'https://i.imgur.com/290uV4S.gif',
      'https://i.imgur.com/CJsRb6y.gif',
      'https://i.imgur.com/73chvDe.gif',
      'https://i.imgur.com/qRihcZN.gif',
      'https://i.imgur.com/YM3lkwm.gif',
      'https://i.imgur.com/gmmYvJU.gif',
      'https://i.imgur.com/q8drloy.gif',
      'https://i.imgur.com/DNbKKLD.gif',
      'https://i.imgur.com/DNbKKLD.gif'
    ];
    
    var rand = list[Math.floor(Math.random() * list.length)];

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return message.channel.send('lembre-se de mencionar um usuário válido para abraçar!');
    }

    const avatar = message.author.displayAvatarURL({ format: 'png' });
    const embed = new Discord.MessageEmbed()
      .setTitle('Hug')
      .setColor('#0096ff')
      .setDescription(`${message.author} **abraçou** ${user}`)
      .setImage(rand)
      .setTimestamp()
      .setThumbnail(avatar)
      .setFooter('Reaja com ❤ para retribuir')
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(`${message.author}`, embed).then((msg) => {
      msg.react('❤')

      const filter = (reaction, usuario) => reaction.emoji.name === '❤' && usuario.id === user.id;

      const collector = msg.createReactionCollector(filter, { max: 1, time: 60000 });
      collector.on('collect', () => {
        const repeat = new Discord.MessageEmbed()
          .setTitle('Hug')
          .setColor('#0096ff')
          .setDescription(`${user} **Abraçou** ${message.author}`)
          .setThumbnail(avatar)
          .setTimestamp()
          .setImage(rand)
          .setAuthor(message.author.tag, avatar);

        message.channel.send(repeat)
      })

    })

  },
};