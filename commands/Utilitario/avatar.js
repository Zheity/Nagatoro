const Discord = require('discord.js');

module.exports = {

    name: "avatar",
    description: "Mostra o seu avatar ou da pessoa mencionada",
    usage: "<nome do user>",
    aliases: ["avatar"],


    run: async (client, message, args) => {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
  
    let embed = new Discord.MessageEmbed() 
      .setColor(`#0096ff`) 
      .setDescription(`**Clique [aqui](https://images-ext-1.discordapp.net/external/bxNWt0nfVosYAw7l971TwwBc4HguiRuDH_XwHyvz5lc/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/332328470380019713/a_970ecb7ddadc5a0802bbec4341c52f89.gif) para baixar a imagem!**`)
      .setTitle(`:frame_photo: Avatar de ${user.username}`) 
      .setImage(avatar)
      .setFooter(`• Autor: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
   await message.channel.send(embed); 

  },
};