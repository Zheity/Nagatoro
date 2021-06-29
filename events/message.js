const Guild = require("../database/Schemas/Guild");
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
module.exports = async (client, message) => {
    if (message.author.bot) return;
  
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
  
    if (message.content.indexOf(prefix) !== 0) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //Making the command lowerCase because our file name will be in lowerCase
    const command = args.shift().toLowerCase();
  
    //Searching a command
    const cmd = client.commands.get(command);
    //Searching a command aliases
    const aliases = client.commands.find(x => x.info.aliases.includes(command))
  
    //if(message.channel.type === "dm")return message.channel.send("None of the commands work in DMs. So please use commands in server!")
  process.on("unhandledRejection", (reason, promise) => {
      try {
          console.error("Rejeição não tratada em: ", promise, "rasão: ", reason.stack || reason);
      } catch {
          console.error(reason);
      }
  });
  require('events').EventEmitter.defaultMaxListeners = 500
  
  
    //Executing the codes when we get the command or aliases
    if(cmd){
      cmd.run(client, message, args);
    }else if(aliases){
      aliases.run(client, message, args);
    }else return
  };