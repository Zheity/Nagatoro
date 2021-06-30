const {
	Util,
	MessageEmbed
} = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
var ytpl = require('ytpl');
const sendError = require("../../util/error")
const fs = require('fs');

module.exports = {

		name: "playlist",
		description: "para tocar um lista de músicas",
		usage: "<YouTube Playlist URL | nome da Playlist>",
		aliases: ["playlist"],

		run: async (client, message, args) => {
		const channel = message.member.voice.channel;
		if (!channel) return sendError("**❌┋Você precisa entrar em um canal de voz para tocar uma música.**", message.channel);
		const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
		var searchString = args.join(" ");
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT")) return sendError("**❌┋Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!**", message.channel);
		if (!permissions.has("SPEAK")) return sendError("**❌┋Não posso falar neste canal de voz, certifique-se de que tenho as permissões adequadas!**", message.channel);

		if (!searchString||!url) return sendError(`Usage: ${message.client.config.prefix}playlist <YouTube Playlist URL | nome da Playlist >`, message.channel);
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			try {
				const playlist = await ytpl(url.split("list=")[1]);
				if (!playlist) return sendError("**❌Não encontrei a Playlist**", message.channel)
				const videos = await playlist.items;
				for (const video of videos) {
					// eslint-disable-line no-await-in-loop
					await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
				}
				return message.channel.send({
					embed: {
						color: "#0096ff",
						description: `✅  **|**  Playlist: **\`${videos[0].title}\`** foi adicionado à fila`
					}
				})
			} catch (error) {
				console.error(error);
				return sendError("**❌Não encontrei a Playlist :(**",message.channel).catch(console.error);
			}
		} else {
			try {
				var searched = await yts.search(searchString)

				if (searched.playlists.length === 0) return sendError("**❌Parece que não consegui encontrar a playlist no YouTube**", message.channel)
				var songInfo = searched.playlists[0];
				let listurl = songInfo.listId;
				const playlist = await ytpl(listurl)
				const videos = await playlist.items;
				for (const video of videos) {
					// eslint-disable-line no-await-in-loop
					await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
				}
				let thing = new MessageEmbed()
					.setAuthor("Playlist foi adicionada à fila", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
					.setThumbnail(songInfo.thumbnail)
					.setColor("#0096ff")
					.setDescription(`✅  **|**  Playlist: **\`${songInfo.title}\`**foi adicionado \`${songInfo.videoCount}\` vídeo para a fila`)
				return message.channel.send(thing)
			} catch (error) {
				return sendError("**❌Ocorreu um erro inesperado**",message.channel).catch(console.error);
			}
		}

		async function handleVideo(video, message, channel, playlist = false) {
			const serverQueue = message.client.queue.get(message.guild.id);
			const song = {
				id: video.id,
				title: Util.escapeMarkdown(video.title),
				views: video.views ? video.views : "-",
				ago: video.ago ? video.ago : "-",
                                duration: video.duration,
				url: `https://www.youtube.com/watch?v=${video.id}`,
				img: video.thumbnail,
				req: message.author
			};
			if (!serverQueue) {
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

				try {
					var connection = await channel.join();
					queueConstruct.connection = connection;
					play(message.guild, queueConstruct.songs[0]);
				} catch (error) {
					console.error(`**❌Não consegui entrar no canal de voz: ${error}**`);
					message.client.queue.delete(message.guild.id);
					return sendError(`**❌Não consegui entrar no canal de voz: ${error}**`, message.channel);

				}
			} else {
				serverQueue.songs.push(song);
				if (playlist) return;
				let thing = new MessageEmbed()
					.setAuthor("A música foi adicionada à fila", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
					.setThumbnail(song.img)
					.setColor("#0096ff")
					.addField("Nome", song.title, true)
					.addField("Duração", song.duration, true)
					.addField("Pedido por", song.req, true)
					.setFooter(`Visualizaçõe: ${song.views} | ${song.ago}`)
				return message.channel.send(thing);
			}
			return;
		}

async	function play(guild, song) {
			const serverQueue = message.client.queue.get(message.guild.id);
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
        if (serverQueue) {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
  	  return sendError(`**❌Ocorreu um erro inesperado. \nTipo possível \`${er}\`**`, message.channel)

         }
       }
     });
}
 
      serverQueue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
			const dispatcher = serverQueue.connection
         .play(ytdl(song.url,{quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
        .on("finish", () => {
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
            play(guild, serverQueue.songs[0]);
        })

    dispatcher.setVolume(serverQueue.volume / 100);
let thing = new MessageEmbed()
				.setAuthor("Começou a tocar música!", "https://cdn.discordapp.com/attachments/850523172356620312/851940388147167312/Music.gif")
				.setThumbnail(song.img)
				.setColor("#00aeef")
				.addField("Nome", song.title, true)
				.addField("Duração", song.duration, true)
				.addField("Pedido por", song.req, true)
				.setFooter(`Visualizações: ${song.views} | ${song.ago}`)
    serverQueue.textChannel.send(thing);
}


	},



}