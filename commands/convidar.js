const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "convidar",
    description: "Para adicionar / convidar o bot para o seu servidor",
    usage: "",
    aliases: ["invite"],
  },

  run: async function (client, message, args) {
    
    //set the permissions id here (https://discordapi.com/permissions.html)
    var permissions = 37088832;
    
    let invite = new MessageEmbed()
    .setTitle(`Convidar ${client.user.username}`)
    .setDescription(`Me quer no seu servidor? Me convide hoje! \n\n [Link](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot)`)
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
    .setColor("#00aeef")
    return message.channel.send(invite);
  },
};