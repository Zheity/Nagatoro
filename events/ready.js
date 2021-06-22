module.exports = async (client) => {
  let statuses = [
    "🌐 Nagatoro Music",
    `👤 ${client.users.cache.size} usuários!`,
    `🌐 ${client.guilds.cache.size} servidores!`,
    "📌 Prefix: n!"
  ]

  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {
      type: "LISTENING",
    });
  }, 1000);

  console.log(`Conectado como ${client.user.username}`);
};