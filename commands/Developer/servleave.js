const Discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild");
module.exports = {
  name: "servleave",
  description: "Comandos de Desenvolvedor Nagatoro!",
  usage: "[servleave]",
  aliases: ["servleave"],

  run: async (client, message, args) => {
    	
    if (args.length  < 1) return message.reply("Informe o id do servidor!");
    if (message.author.id !== "332328470380019713" || message.author.id !== "786941260971376650") return message.reply("ERRO PERM");
    client.guilds.cache.get(args.join(" ")).leave()
    .then(g => message.reply(`Saiu da guilda ${g}`)) .catch(console.error);
    
  },
};
