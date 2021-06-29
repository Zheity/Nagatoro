const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let guildSchema = new Schema({
    idS: { type: String },
    prefix: { type: String, default: "n!" },
});

let Guild = mongoose.model("Guilds", guildSchema);
module.exports = Guild;