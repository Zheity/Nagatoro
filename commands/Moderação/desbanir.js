const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error")

module.exports = {

    name: "desbanir",
    description: "Desbane a pessoa mencionada",
    usage: "[nome]",
    aliases: ["unban"],


    run: async (client, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return sendError("**❌┋Não tens as permissões para cancelar o banimento de alguém!**", message.channel);

        if (!args[0]) sendError("**❌┋Escreva um nome!**", message.channel)
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) sendError("**❌┋Forneça um nome de usuário, tag ou ID válidos ou o usuário para desbanir!**", message.channel)

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) sendError("**❌┋Não tenho permissão para cancelar o banimento de alguém!**", message.channel)
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setTitle("Sistema de Moderação")
                    .setColor("#0096ff")
                    .setThumbnail(message.guild.iconURL())
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`**${bannedMember.user.tag} foi desbanido por ${reason}**`)
                    .setImage("https://i.pinimg.com/originals/33/35/fc/3335fc4ca5010391a5a770ddfc1c6804.gif")
                    .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setTitle("Sistema de Moderação")
                    .setColor("#0096ff")
                    .setThumbnail(message.guild.iconURL())
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`**${bannedMember.user.tag} foi desbanido**`)
                    .setImage("https://i.pinimg.com/originals/33/35/fc/3335fc4ca5010391a5a770ddfc1c6804.gif")
                    .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
                message.channel.send(sembed2)
            }
        } catch {}

  },
};