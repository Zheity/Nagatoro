require("dotenv").config();
const express = require("express");
const Guild = require("./database/Schemas/Guild");
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Olá, Mundo'));
app.listen(port, () => console.log(`http://localhost:${port}`));

const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();
client.commands = new Collection();
client.queue = new Map();

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#0096ff",
        reaction: "🎉"
    }
});

fs.readdir(__dirname + "/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(__dirname + `/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log("Evento Carregado: " + eventName)
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log("Comando Carregado: " + commandName)
    });
});

const dbIndex = require("./database/index.js");
dbIndex.start();

client.login(process.env.TOKEN)