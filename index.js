
const DiscordBot = require('./src/DiscordBot');
const defaults = require('./src/defaults')

const options ={
    port :  5000,
    signature: defaults.signature
}

app = new DiscordBot(options);

app.startServer();
