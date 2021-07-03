const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error")

module.exports = {

    name: "expulsar",
    description: "banir a pessoa mencionada",
    usage: "[nome]",
    aliases: ["ban"],


    run: async (client, message, args) => {

      try {
        if (!message.member.hasPermission("KICK_MEMBERS")) return sendError("**❌┋Não tens permissão para expulsar usuários! - apenas staff podem expulsar**", message.channel);
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return sendError("**❌┋Não tens permissão para expulsar usuários! - apenas staff podem expulsar**", message.channel);
        if (!args[0]) return sendError("**❌┋Forneça um usuário para expulsar!**", message.channel)

        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!kickMember) return sendError("**❌┋O usuário não está na Guild**", message.channel);
        if (kickMember === message.member) return sendError("**❌┋Não podes expulsar-te**", message.channel)

        var reason = args.slice(1).join(" ");

        if (!kickMember.kickable) return sendError("**❌┋Não consigo expulsar esse usuário**", message.channel)
        try {
            const sembed2 = new MessageEmbed()
                .setTitle("Sistema de Moderação")
                .setThumbnail(message.guild.iconURL())
                .setColor("RED")
                .setDescription(`**Olá, você foi expulso de ${message.guild.name} por - ${reason || "Sem Razão!"}**`)
                .setFooter(message.guild.name, message.guild.iconURL())
            kickMember.send(sembed2).then(() =>
                kickMember.kick()).catch(() => null)
        } catch {
            message.guild.members.kick(kickMember, { days: 7, reason: reason })
        }
        if (reason) {
        var sembed = new MessageEmbed()
            .setTitle("Sistema de Moderação")
            .setThumbnail(message.guild.iconURL())
            .setColor("#00aeef")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**${kickMember.user.username}** foi expulso por ${reason}`)
            .setImage("https://i.imgur.com/rKkQvKK.gif")
            .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
        message.channel.send(sembed)
        } else {
            var sembed2 = new MessageEmbed()
            .setTitle("Sistema de Moderação")
            .setThumbnail(message.guild.iconURL())
            .setColor("#00aeef")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**${kickMember.user.username}** foi expulso`)
            .setImage("https://i.imgur.com/rKkQvKK.gif")
            .setFooter("© Nagatoro Music - https://nagatoro.waaclive.com")
        message.channel.send(sembed2)
        }

    } catch (e) {
        return message.channel.send(`**${e.message}**`)
    }

  },
};