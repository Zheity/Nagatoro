const { MessageEmbed, version: djsversion } = require('discord.js')
const { version } = require('../package.json');
const moment = require('moment')
const { utc } = require('moment');
moment.locale('pt-br');

module.exports = {
  info: {
    name: "botinfo",
    description: "informaçao do bot",
    usage: "",
    aliases: ["botinfo"],
  },

  run: async function (client, message, args) {
    
    let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `🗓️ ${days.toFixed()} dias\n🗓️ ${hours.toFixed()} horas\n🗓️ ${minutes.toFixed()} minutos\n🗓️ ${seconds.toFixed()} segundos`;
        

            message.delete()
            const inline = true
            const botAvatar = client.user.displayAvatarURL
            const date = client.user.createdAt
            const userName = client.user.username
            const servsize = client.guilds.cache.size
            const usersize = client.users.cache.size
            const status = {
              online: '`🟢` Online',
              offline: '`⚫` Offline'
            }
    
            let embed = new MessageEmbed()
            .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
            .setThumbnail(botAvatar)
            .setAuthor('🤖 Minhas informações')
            .addField('**Meu nick**', userName)
            .addField('**Meu ID**', client.user.id)
            .addField('**Servidores**', `🛡 ${servsize}`, true)
            .addField('**Usuários**', `${usersize}`, inline)
            .addField('**Versão**', `${version}`, inline)
            .addField('**Node.js**', `${process.version}`, inline)
            .addField('**Discord.js**', `${djsversion}`, inline)
            .addField('**Estou online a**', `${uptime}`)
            .addField('**Criado em**', `${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`)
            .setFooter(`2020 © ${client.user.username}.`)
            .setTimestamp()
            message.channel.send(embed).then(m => (m.delete({timeout: 10000})));

            function formatDate (template, date) {
                var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
                date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
                return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
                  return template.split(specs[i]).join(item)
                }, template)
              }
  },
};