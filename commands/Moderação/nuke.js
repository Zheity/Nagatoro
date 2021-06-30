const { MessageEmbed } = require('discord.js')
const sendError = require("../../util/error")

module.exports = {

    name: "nuke",
    description: "Limpa o channel",
    usage: "",
    aliases: ["nuke"],

    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return sendError("**❌┋Você não tem permissões para usar este comando**", message.channel);
        let reason = args.join(" ") || "Nenhuma Razão"
        if(!message.channel.deletable) {
            return message.reply("Este canal não pode ser limpo!")
        }
        let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new MessageEmbed()
        .setTitle("Channel Limpo")
        .setColor("#0096ff")
        .setDescription(reason)
        .setImage('https://media0.giphy.com/media/oe33xf3B50fsc/200.gif')
        await newchannel.send(embed)
    }
}