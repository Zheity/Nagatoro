const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "tocar",
    description: "Para tocar músicas",
    usage: "<YouTube_URL> | <nome da musica>",
    aliases: ["play"],
  },

  run: async function (client, message, args) {
    let channel = message.member.voice.channel;
    if (!channel)return sendError("**❌┋Você precisa entrar em um canal de voz para tocar uma música.**!", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("**❌┋Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!**", message.channel);
    if (!permissions.has("SPEAK"))return sendError("**❌┋Não posso falar neste canal de voz, certifique-se de que tenho as permissões adequadas!**", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return sendError("**❌┋Você não forneceu uma música para tocar!**", message.channel);
   	const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
   var serverQueue = message.client.queue.get(message.guild.id);

     let songInfo = null;
    let song = null;
    if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
       try {
          songInfo = await ytdl.getInfo(url)
          if(!songInfo)return sendError("**Parece que não consegui encontrar a música no YouTube**", message.channel);
        song = {
       id: songInfo.videoDetails.videoId,
       title: songInfo.videoDetails.title,
       url: songInfo.videoDetails.video_url,
       img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
      duration: songInfo.videoDetails.lengthSeconds,
      ago: songInfo.videoDetails.publishDate,
      views: String(songInfo.videoDetails.viewCount).padStart(10, ' '),
      req: message.author

        };

      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }else {
      try {
        var searched = await yts.search(searchString);
    if(searched.videos.length === 0)return sendError("**❌Parece que não consegui encontrar a música no YouTube**", message.channel)
    
     songInfo = searched.videos[0]
        song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("A música foi adicionada à fila", "https://cdn.discordapp.com/attachments/850523172356620312/851940388147167312/Music.gif")
      .setThumbnail(song.img)
      .setColor("#0096ff")
      .addField("Nome", song.title, true)
      .addField("Duração", song.duration, true)
      .addField("Pedido por", song.req, true)
      .setFooter(`Visualizações: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 80,
      playing: true,
      loop: false
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var online = afk[message.guild.id]
    if (!song){
      if (!online.afk) {
        sendError("**👋┋Saindo do canal de voz porque acho que não tem músicas na fila. Se você gosta do bot, fique 24 horas nos sete dias da semana no canal de voz, escreva `!afk`**", message.channel)
        message.guild.me.voice.channel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
      }
            return message.client.queue.delete(message.guild.id);
}
 let stream = null; 
    if (song.url.includes("youtube.com")) {
      
      stream = await ytdl(song.url);
stream.on('error', function(er)  {
      if (er) {
        if (queue) {
        queue.songs.shift();
        play(queue.songs[0]);
  	  return sendError(`**❌Ocorreu um erro inesperado.\nTipo possível \`${er}\`**`, message.channel)
          }
        }
    });
}
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

      const dispatcher = queue.connection
         .play(ytdl(song.url, {quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
         .on("finish", () => {
           const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            };
          play(queue.songs[0])
        })

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
      .setAuthor("Começou a tocar música!", "https://cdn.discordapp.com/attachments/850523172356620312/851940388147167312/Music.gif")
      .setThumbnail(song.img)
      .setColor("#00aeef")
      .addField("Nome", song.title, true)
      .addField("Duração", song.duration, true)
      .addField("Pedido por", song.req, true)
      .setFooter(`Visualizações: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`**❌┋Não consegui entrar no canal de voz: ${error}**`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return sendError(`**❌┋Não consegui entrar no canal de voz: ${error}**`, message.channel);
    }
  


},

};