const { MessageEmbed } = require('discord.js')
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "limpar",
    description: "Comando para apagar mensagens",
    usage: "",
    aliases: ["clear"],
  },

  run: async function (client, message, args) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sendError("**❌┋Você não tem permissão!**", message.channel);
   
    const comousar = new MessageEmbed()
       .setAuthor("Nagatoro Music")
       .setThumbnail(message.guild.iconURL())
       .setTitle(`n!limpar`)
       .setDescription(`Irá limpar o número de mensagens escolhido.`)
       .setColor("#0096ff")
       .setFooter("© Nagatoro music - https://nagatoro.waaclive.com")
       .addField("Como usar:", `\`n!limpar <número maior que 2 e menor que 100>\`\n\`n!limpar 57\``)
       .addField("Permissão:", "Só pode ser usado pelo staff que esta em um cargo com a permissão `Gerenciar mensagens`")
 
    const num = args.join(" ");
 
    if(!num) return message.channel.send(comousar)
    if(isNaN(num) == true) return sendError("**❌┋por favor, digite somente números, de 2 a 100.**", message.channel);
    if(num < 2) return sendError("**❌┋por favor, digite o número maior que 2 para deletar as mensagens.**", message.channel);
    if(num > 100) return sendError("**❌┋por favor, digite o número maior que 2 e menos que 100**", message.channel);
    message.channel.bulkDelete(args[0]).catch(error => sendError("**❌┋algumas mensagens não puderam ser deletadas por serem enviadas a mais de 2 semanas!**", message.channel));
    
    message.channel.send(`Chat limpo! Limpado **${args[0]}** mensagens por ${message.author}.`);

  },
};