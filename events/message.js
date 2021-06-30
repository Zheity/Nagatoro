const Guild = require("../database/Schemas/Guild");
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const { devs } = require('../config.json')
module.exports.run = async(client, message,) => {
  if(message.author.bot) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  
    try {
      const server = await Guild.findOne({ idS: message.guild.id });
  
      if (message.author.bot == true) return;
      if (!server) await Guild.create({ idS: message.guild.id });
  
      var prefix = prefix;
      prefix = server.prefix;
  
      if (message.content.match(GetMention(client.user.id))) {
        message.channel.send(
          `Olá ${message.author}, meu prefixo no servidor é **${prefix}**.`
        );
      }
    } catch (err) {
      if (err) console.error(err);
    }

    require('events').EventEmitter.defaultMaxListeners = 500

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();

    if(cmd.length == 0 ) return;

    let command = client.commands.get(cmd)

    if(!command) command = client.commands.get(client.aliases.get(cmd));
    
    if(command) command.run(client, message, args) 
    
}