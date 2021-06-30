const { Client, Collection } = require("discord.js");
require("dotenv").config();
const config = require("./config.json");
const express = require("express");
const Guild = require("./database/Schemas/Guild");
const { token } = require("./config.json")

const client = new Client({
    disableEveryone: true
})

client.queue = new Map();

// Collections
client.commands = new Collection();
client.aliases = new Collection();

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


["command","event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const dbIndex = require("./database/index.js");
dbIndex.start();


client.login(config.token);