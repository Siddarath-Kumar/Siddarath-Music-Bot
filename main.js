const Discord = require('discord.js'); // get const discord to communicate with the node modules

const client = new Discord.Client({intents:["GUILDS", "GUILD_MESSAGES"]}); // creating the discord bot as a client

const prefix = '!'; // Assigning the bots prefix for the commands

client.once('ready', ()=>
{
    console.log('Sids music bot is online!');
});

client.on('message', message=>
{
    if(!message.content.startsWith(prefix) || message.author.bot) // if content doesnt start with prefix do nothing
    {
        return;
    }

    const args = message.content.slice(prefix.length).split("/ +/"); // splicing to enable space between commands
    const command = args.shift().toLowerCase();

    if(command=== 'ping')
    {
        message.channel.send('The ping command has been registered!');
    }
    else if (command == 'music')
    {
        message.channel.send('https://www.youtube.com/watch?v=gfHbg53ykPY&ab_channel=KSI');
    }
    else if(command == 'help')
    {
        message.channel.send('Help will be provided here!');
    }
});






client.login('OTY1NTM2MTk0NDUwNTcxMjc2.Yl0npw.WGgiR5hbvRR_uuIjqVHtH0TlIHM'); // logging into discord music bot