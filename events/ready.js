
module.exports.run = async(client) => {
      // Contador Stats
  const guild = client.guilds.cache.get("858160992826556417");
  setInterval(function () {
    var memberCountChannel = client.channels.cache.get("858159556256202762");
    memberCountChannel.setName(`👤┆Usuários: ${client.users.cache.size}`);
    var serverCountChannel = client.channels.cache.get("858159594224353300");
    serverCountChannel.setName(`🌐┆Servidores: ${client.guilds.cache.size}`);
    var voiceCountChannel = client.channels.cache.get("858159638519742464");
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