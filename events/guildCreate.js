module.exports = async (client, guild) => {

    client.channels.cache.get("858160992826556417").send({
        embed: {
            title: ("Eu fui adicionada em um novo servidor!"),
            color: ("#00aeef"),
            //description: `Eu fui adicionada em um novo servidor!\n👤︙**${guild.name}**\n🌐︙**${guild.id}**`
            thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/850523172356620312/850525307995422760/Sem-Titulo-1.png',
            },
            fields: [
                {
                    name: `Nome do Servidor`,
                    value: `👤︙${guild.name}`,
                },
                {
                    name: "Id do Servidor",
                    value: `🌐︙${guild.id}`,
                },
                {
                    name: "Nome do dono",
                    value: `👑︙${guild.owner.user.tag}`,
                },
                {
                    name: "Id do Dono do servidor",
                    value: `🌐︙${guild.owner.id}`,
                },
                {
                    name: "Usuários",
                    value: `👤︙${client.users.cache.size}`,
                },
                {
                    name: "Servidores",
                    value: `🌐︙${client.guilds.cache.size}`,
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