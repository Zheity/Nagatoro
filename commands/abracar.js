const Discord = require('discord.js');


module.exports = {
  info: {
    name: "abracar",
    description: "abraça a pessoa mencionada",
    usage: "[nome]",
    aliases: ["hug"],
  },

  run: async function (client, message, args) {

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
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
    return message.reply('lembre-se de mencionar um usuário válido para abraçar!');
    }
    /*
    message.channel.send(`${message.author.username} **acaba de abraçar** ${user.username}! :heart:`, {files: [rand]});
    */
    let avatar = message.author.displayAvatarURL({format: 'png'});
      const embed = new Discord.MessageEmbed()
            .setTitle('Abraço')
            .setColor('#000000')
            .setDescription(`${message.author} Abraçou o ${user}`)
            .setImage(rand)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('© Nagatoro Music - https://nagatoro.waaclive.com')
            .setAuthor(message.author.tag, avatar);
      await message.channel.send(embed);

  },
};