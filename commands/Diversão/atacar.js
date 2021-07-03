const Discord = require('discord.js');


module.exports = {

    name: "atacar",
    description: "ataca a pessoa mencionada",
    usage: "[usuário]",
    aliases: ["attack"],


    run: async (client, message, args) => {

      var list = [
        'https://i.imgur.com/vgevUHU.gif',
        'https://i.imgur.com/BAd6MjW.gif',
        'https://i.imgur.com/uGhQ25C.gif',
        'https://i.imgur.com/VsIi4qh.gif',
        'https://i.imgur.com/UFTRe7h.gif',
        'https://i.imgur.com/ICaxPOT.gif',
        'https://i.imgur.com/YoCVSDM.gif',
        'https://i.imgur.com/FC4iTFL.gif',
        'https://i.imgur.com/HvwqeEV.gif',
        'https://i.imgur.com/Sbiyn1D.gif',
        'https://i.imgur.com/hPMyZHX.gif',
        'https://i.imgur.com/ti13pwN.gif',
        'https://i.imgur.com/PB5hsRn.gif',
        'https://i.imgur.com/Bwrq5KV.gif',
        'https://i.imgur.com/4KC2G85.gif',
        'https://i.imgur.com/wIYuz3u.gif',
        'https://i.imgur.com/fAI0U4Z.gif',
        'https://i.imgur.com/I0GJcc0.gif',
        'https://i.imgur.com/kIbfDx8.gif',
        'https://i.imgur.com/KJduikQ.gif',
        'https://i.imgur.com/oHhTHyg.gif',
        'https://i.imgur.com/dY9F7e4.gif',
        'https://i.imgur.com/fca5qWv.gif'
      ];
    
    var rand = list[Math.floor(Math.random() * list.length)];

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return message.channel.send('lembre-se de mencionar um usuário válido para atacar!');
    }

    const avatar = message.author.displayAvatarURL({ format: 'png' });
    const embed = new Discord.MessageEmbed()
      .setTitle('Attack')
      .setColor('#0096ff')
      .setDescription(`${message.author} **atacou** ${user}`)
      .setImage(rand)
      .setTimestamp()
      .setThumbnail(avatar)
      .setFooter('Reaja com 🌟 para retribuir')
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(`${message.author}`, embed).then((msg) => {
      msg.react('🌟')

      const filter = (reaction, usuario) => reaction.emoji.name === '🌟' && usuario.id === user.id;

      const collector = msg.createReactionCollector(filter, { max: 1, time: 60000 });
      collector.on('collect', () => {
        const repeat = new Discord.MessageEmbed()
          .setTitle('Attack')
          .setColor('#0096ff')
          .setDescription(`${user} **Atacou** ${message.author}`)
          .setThumbnail(avatar)
          .setImage(rand)
          .setTimestamp()
          .setAuthor(message.author.tag, avatar);

        message.channel.send(repeat)
      })

    })

  },
};