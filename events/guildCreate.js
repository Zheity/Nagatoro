module.exports = async (client, guild) => {

    client.channels.cache.get("858160992826556417").send({
        embed: {
            color: ("#00aeef"),
            description: `Eu fui adicionada em um novo servidor!\n👤︙**${guild.name}**\n🌐︙**${guild.id}**`
        },
    });
}