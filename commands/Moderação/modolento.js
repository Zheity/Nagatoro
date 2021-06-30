const sendError = require("../../util/error")

module.exports = {

    name: "modolento",
    description: "Defina o modo lento de um canal.",
    usage: "[tempo para o modo lento]",
    aliases: ["slowmode"],

    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return sendError("**❌┋Você não tem permissões para usar este comando**", message.channel);
        
        let duration = args[0]
        if(isNaN(duration)) return message.reply("Por favor, dê o tempo em segundos.")
        let reason = args.slice(1).join(" ")
        if(!reason) return message.reply("Especifique um motivo!")
        
        message.channel.setRateLimitPerUser(duration, reason)
        message.reply(`Definido com sucesso o modo lento para ${duration} segundos por - ${reason}`)
    }
}