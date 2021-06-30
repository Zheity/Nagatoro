
module.exports.run = async(client) => {
      // Contador Stats
  const guild = client.guilds.cache.get("841672494111916043");
  setInterval(function () {
    var memberCountChannel = client.channels.cache.get("859538986830004225");
    memberCountChannel.setName(`👤┆Usuários: ${client.users.cache.size}`);
    var serverCountChannel = client.channels.cache.get("859539017728917544");
    serverCountChannel.setName(`🌐┆Servidores: ${client.guilds.cache.size}`);
    var voiceCountChannel = client.channels.cache.get("859539031469326356");
    voiceCountChannel.setName(
      `🎵┆Me Ouvindo: ${client.voice.connections.size}`
    );
  }, 1000);

  let statuses = [
    "🌐 Nagatoro Music",
    `👤 ${client.users.cache.size} usuários!`,
    `🌐 ${client.guilds.cache.size} servidores!`,
    "📌 Prefix: n!",
    "🌐 n!help",
  ];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {
      type: "LISTENING",
    });
  }, 1000);

  console.log(`Conectado como ${client.user.username}`);
};