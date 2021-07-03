const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error")

module.exports = {

    name: "darrole",
    description: "banir a pessoa mencionada",
    usage: "[nome]",
    aliases: ["ban"],


    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_ROLES"))  return sendError("**❌┋Não tens as permissões para adicionar Roles aos usuários!**", message.channel);
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return sendError("**❌┋Não tenho as permissões para adicionar roles aos usuários!**", message.channel);
        
        if (!args[0]) return sendError("**❌┋Insira uma Role!**", message.channel)

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return sendError("**❌┋Escreva um nome de usuário!**", message.channel);
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return sendError("**❌┋Não é possível adicionar esta role a este usuário!**", message.channel)

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return sendError("**❌┋Insira uma Role!**", message.channel)

        if (!role) return sendError("**❌┋Não consegui encontrar essa role**", message.channel)

        if (role.managed) return sendError("**❌┋Não é possível adicionar essa role ao usuário!**", message.channel)
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return sendError("**❌┋A role é atualmente maior do que eu, portanto, não posso adicioná-la ao usuário!**", message.channel)

        if (rMember.roles.cache.has(role.id)) return sendError("**❌┋O usuário já tem a role!**", message.channel)
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        var sembed = new MessageEmbed()
            .setTitle("Sistema de Moderação")
            .setColor("#00aeef")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`***Role foi adicionado a ${rMember.user.username}***`)
            .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
        message.channel.send(sembed)

  },
};