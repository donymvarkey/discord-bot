const Discord = require('discord.js');

const initBot = (token) => {

    const BOT_TOKEN = token;
    const client = new Discord.Client();

    client.on('guildMemberAdd', member => {
        // Send the message to a designated channel on a server:
        const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
        // Do nothing if the channel wasn't found on this server
        if (!channel) return;
        // Send the message, mentioning the member
        channel.send(`Welcome to the server, ${member}`);
    });

    client.on("message", (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        if (command === 'info') {
            // console.log(message.author)
            let guild = message.guild;
            const infoEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Info of user ${message.author.username}`)
            .addFields(
                {name: 'Username', value: `${message.author.username}`},
                {name: 'UserId', value: `${message.author.id}`}
            )
            message.reply(infoEmbed)
        }

        if (command === 'link') {
            let guild = message.guild;
            const link = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`${guild.name}'s link`)
            .addFields(
                {name: 'Join', value: 'https://discord.gg/cDUbBYa'}
            )
            message.reply(link)
        }
        
        
        if (command === 'server') {
            let guild = message.guild;
            const ServerInfo = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Server infomation on ${guild.name}`)
            .setDescription(`Command executed by ${message.author.tag}`)
            .addFields(
                { name: 'Members', value: `${guild.memberCount}` },
                { name: 'Region', value: `${guild.region.toUpperCase()}` },
                { name: 'Owner', value: `${guild.owner}`, inline: true },
                { name: 'Created At', value: `${guild.createdAt}`, inline: true },
            )
            message.reply(ServerInfo)
        }

        if (command === "ping") {
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        }
    })

    client.login(BOT_TOKEN)

    console.log('INFO: Bot online')
}

module.exports = {
    initBot
}