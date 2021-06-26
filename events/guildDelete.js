module.exports = async (client, guild) => {

    client.channels.cache.get("858160992826556417").send({
        embed: {
            color: ('#00aeef'),
            description: `Eu fui removida de um servidor!\n👤︙**${guild.name}**\n🌐︙**${guild.id}**`
        },
    });
}