module.exports.run = async (client, guild) => {

    client.channels.cache.get("858160992826556417").send({
        embed: {
            title: ("Eu fui adicionada em um novo servidor!"),
            color: ("#00aeef"),
            //description: `Eu fui adicionada em um novo servidor!\nð¤ï¸**${guild.name}**\nðï¸**${guild.id}**`
            thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/850523172356620312/850525307995422760/Sem-Titulo-1.png',
            },
            fields: [
                {
                    name: `Nome do Servidor`,
                    value: `ð¤ï¸${guild.name}`,
                },
                {
                    name: "Id do Servidor",
                    value: `ðï¸${guild.id}`,
                },
                {
                    name: "Nome do dono",
                    value: `ðï¸${guild.owner.user.tag}`,
                },
                {
                    name: "Id do Dono do servidor",
                    value: `ðï¸${guild.owner.id}`,
                },
                {
                    name: "UsuÃ¡rios",
                    value: `ð¤ï¸${client.users.cache.size}`,
                },
                {
                    name: "Servidores",
                    value: `ðï¸${client.guilds.cache.size}`,
                }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Nagatoro Server',
                icon_url: 'https://cdn.discordapp.com/attachments/850523172356620312/850525307995422760/Sem-Titulo-1.png',
            },
        },
    });
}