const mongoose = require("mongoose");
const c = require("colors");

module.exports = {
    start() {
        try {
            mongoose.connect(process.env.MONGODB_SRV, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });

            console.log(c.blue(`[DataBase] - Conectado ao Banco de Dados.`));
        } catch (err) {
            if (err) return console.log(c.red(`[DataBase] - ERROR:`, +err));
        }
    },
};