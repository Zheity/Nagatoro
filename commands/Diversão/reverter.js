const sendError = require("../../util/error");

module.exports = {

    name: "reverter",
    description: "Reverte a palavra ou texto que escrever",
    usage: "[frases/texto]",
    aliases: ["reverse"],

    run: async (client, message, args) => {
        const text = args.join(" ")
        if(!text) return sendError("**❌┋Precisa de escrever algo para reverter.**", message.channel);
        let Rarray = text.split("")
        let reverseArray = Rarray.reverse()
        let result = reverseArray.join("")
        message.channel.send(result)
    }
}

/*
sample string - hello
array - ['h','e','l','l','o']
reversed - ['o','l','l','e','h']
result - olleh
*/