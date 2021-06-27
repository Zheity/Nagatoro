const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "convidar",
    description: "Para adicionar / convidar o bot para o seu servidor",
    usage: "",
    aliases: ["invite"],
  },

  run: async function (client, message, args) {
    //permissão do bot
    var permissions = 8;
    
    let invite = new MessageEmbed()
    .setTitle(`Convidar ${client.user.username}`)
    .setThumbnail("https://cdn.discordapp.com/attachments/850523172356620312/850525307995422760/Sem-Titulo-1.png")
    .setDescription(`**Me quer no seu servidor? Me convide hoje!**\n\n*Para me convidar clique nos links abaixo \n\n **Nagatoro**: [Convidar](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot)\n\n **Servidor de Suporte**: [Entrar](https://discord.com/invite/zh5RnTGH7r)`)
    .setColor("#00aeef")
    .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
    return message.channel.send(message.author, invite);
  },
};