const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "ajuda",
        description: "Para mostrar esta mensagem",
        usage: "[comando]",
        aliases: ["help"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="`"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Comandos de "+client.user.username, "https://cdn.discordapp.com/attachments/850523172356620312/851940388147167312/Music.gif")
        .setColor("#00aeef")
        .setDescription(allcmds)
        .setFooter(`Para obter informações de cada comando que você pode fazer ${client.config.prefix}ajuda [comando]`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Comando desconhecido")
            let commandinfo = new MessageEmbed()
            .setTitle("Informaçao do Comando: "+command.info.name+" ")
            .setColor("#00aeef")
            .setDescription(`
Nome: ${command.info.name}
Descrição: ${command.info.description}
Usar comando[PT/BR]: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Usar comando[EN]: \`\`${client.config.prefix}${command.info.aliases.join(", ")}\`\`
`)
            message.channel.send(commandinfo)
        }
    }
}