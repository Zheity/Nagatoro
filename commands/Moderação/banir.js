const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error")

module.exports = {

    name: "banir",
    description: "banir a pessoa mencionada",
    usage: "[nome]",
    aliases: ["ban"],


    run: async (client, message, args) => {

      try {
        if (!message.member.hasPermission("BAN_MEMBERS")) return sendError("**❌┋Não tens permissão para banir usuários! - apenas staff podem banir**", message.channel);
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return sendError("**❌┋Não tens permissão para banir usuários! - apenas staff podem banir**", message.channel);
        if (!args[0]) return sendError("**❌┋Forneça um usuário para banir!**", message.channel)

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!banMember) return sendError("**❌┋O usuário não está na Guild**", message.channel);
        if (banMember === message.member) return sendError("**❌┋Não podes banir-te**", message.channel)

        var reason = args.slice(1).join(" ");

        if (!banMember.bannable) return sendError("**❌┋Não consigo banir esse usuário**", message.channel)
        try {
            const sembed2 = new MessageEmbed()
                .setTitle("Sistema de Moderação")
                .setThumbnail(message.guild.iconURL())
                .setColor("RED")
                .setDescription(`**Olá, você foi banido de ${message.guild.name} por - ${reason || "Sem Razão!"}**`)
                .setFooter(message.guild.name, message.guild.iconURL())
            banMember.send(sembed2).then(() =>
                banMember.ban()).catch(() => null)
        } catch {
            message.guild.members.ban(banMember, { days: 7, reason: reason })
        }
        if (reason) {
        var sembed = new MessageEmbed()
            .setTitle("Sistema de Moderação")
            .setThumbnail(message.guild.iconURL())
            .setColor("#00aeef")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**${banMember.user.username}** foi banido por ${reason}`)
            .setImage("https://i.kym-cdn.com/photos/images/newsfeed/001/191/461/1fe.gif")
            .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
        message.channel.send(sembed)
        } else {
            var sembed2 = new MessageEmbed()
            .setTitle("Sistema de Moderação")
            .setThumbnail(message.guild.iconURL())
            .setColor("#00aeef")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**${banMember.user.username}** foi banido`)
            .setImage("https://i.kym-cdn.com/photos/images/newsfeed/001/191/461/1fe.gif")
            .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
        message.channel.send(sembed2)
        }

    } catch (e) {
        return message.channel.send(`**${e.message}**`)
    }

  },
};