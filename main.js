const Discord = require('discord.js'); // get const discord to communicate with the node modules

const client = new Discord.Client({intents:["GUILDS", "GUILD_MESSAGES"]}); // creating the discord bot as a client

const prefix = '!'; // Assigning the bots prefix for the commands

const fs = require('fs'); // To get into other javascript files

client.commands = new Discord.Collection(); // Collection of commands stored

const botCommandFiles = fs.readdirSync('./bot_commands/').filter(file => file.endsWith('js')); // only read javascript command files

for(const file of botCommandFiles)
{
    const command = require(`./bot_commands/${file}`);

    client.commands.set(command.name, command);
}

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

    if(command === 'ping')
    {
        client.commands.get('ping').execute(message, args);
    }
    else if (command == 'music')
    {
        client.commands.get('music').execute(message, args);
    }
    else if(command == 'help')
    {
        client.commands.get('help').execute(message, args);
    }
});






client.login('OTY1NTM2MTk0NDUwNTcxMjc2.Yl0npw.WGgiR5hbvRR_uuIjqVHtH0TlIHM'); // logging into discord music bot