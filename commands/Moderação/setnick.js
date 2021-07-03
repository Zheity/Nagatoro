const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error")

module.exports = {

    name: "setnick",
    description: "banir a pessoa mencionada",
    usage: "[nome]",
    aliases: ["ban"],


    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return sendError("**❌┋Não tens permissão para alterar o nickname a outros usuários!**", message.channel);

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return sendError("**❌┋Não tenho permissão para alterar o nickname!**", message.channel);
      
        if (!args[0]) return sendError("**❌┋Insira um usuário!**", message.channel)
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return sendError("**❌┋Por favor coloque um nome de usuário!**", message.channel)

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return sendError("**❌┋Não é possível definir ou alterar o nickname deste usuário!**", message.channel)

        if (!args[1]) return sendError("**❌┋Escreva um nickname**", message.channel);

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setTitle("Sistema de Moderação")
            .setColor("#00aeef")
            .setDescription(`***nickname alterado de ${member.displayName} to ${nick}***`)
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
        message.channel.send(embed)
        } catch {
            return sendError("**❌┋Permissão ausentes**", message.channel)
        }

  },
};