const Discord = require('discord.js');


module.exports = {

    name: "dancar",
    description: "dancar com alguem ou sozinho",
    usage: "[usuário] ",
    aliases: ["dance"],


    run: async (client, message, args) => {

      const user = message.mentions.users.first();
      const sayMessage = args.join(' ');
  
      var list = [
        'https://i.imgur.com/uo20CMC.gif',
        'https://i.imgur.com/dvXTF4w.gif',
        'https://i.imgur.com/ZBD3iLx.gif',
        'https://i.imgur.com/JPZCTdq.gif',
        'https://i.imgur.com/NMk56CD.gif',
        'https://i.imgur.com/3ciJr3e.gif',
        'https://i.imgur.com/IhRw1DT.gif',
        'https://i.imgur.com/RrVCBnM.gif',
        'https://i.imgur.com/ueHtpyv.gif',
        'https://i.imgur.com/8CiNtDC.gif',
        'https://i.imgur.com/naOCB5y.gif',
        'https://i.imgur.com/P0Q4NVa.gif',
        'https://i.imgur.com/jn2RRVW.gif',
        'https://i.imgur.com/2QEaBVq.gif',
        'https://i.imgur.com/BdkDMpH.gif',
        'https://i.imgur.com/eCCJ1d3.gif',
        'https://i.imgur.com/MHMdbtJ.gif',
        'https://i.imgur.com/L2yW8JT.gif',
        'https://i.imgur.com/3YfyP4F.gif',
        'https://i.imgur.com/sxLRWY9.gif',
        'https://i.imgur.com/dBCgYr7.gif',
        'https://i.imgur.com/qyJGFtE.gif',
        'https://i.imgur.com/BCebOnD.gif',
        'https://i.imgur.com/xwiDS5Z.gif',
        'https://i.imgur.com/iid6Bh4.gif'
      ];
  
      var rand = list[Math.floor(Math.random() * list.length)];
      if (user) {
        const avatar = message.author.displayAvatarURL({ format: 'png' });
        const embed = new Discord.MessageEmbed()
          .setTitle('Dance')
          .setColor('#0096ff')
          .setDescription(`**${message.author} está dançando com ${user}!**`)
          .setImage(rand)
          .setThumbnail(avatar)
          .setTimestamp()
          .setAuthor(message.author.tag, avatar);
        message.channel.send(embed);
      } else {
        const avatar = message.author.displayAvatarURL({ format: 'png' });
        const embed = new Discord.MessageEmbed()
          .setTitle('Dance')
          .setColor('#0096ff')
          .setDescription(`**${message.author} está dançando**${sayMessage}`)
          .setImage(rand)
          .setThumbnail(avatar)
          .setTimestamp()
          .setAuthor(message.author.tag, avatar);
        await message.channel.send(embed);
      }

  },
};