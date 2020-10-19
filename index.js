
const DiscordBot = require('./src/DiscordBot');
const dontenv = require('dotenv')
dontenv.config();

const options ={
    port :  process.env.PORT,
    signature: process.env.SIGNATURE,
    token: process.env.BOT_TOKEN
}

app = new DiscordBot(options);

app.startServer();
