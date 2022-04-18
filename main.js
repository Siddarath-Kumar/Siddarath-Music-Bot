const Discord = require('discord.js'); // get const discord to communicate with the node modules

const client = new Discord.Client({intents:["GUILDS", "GUILD_MESSAGES"]}); // creating the discord bot as a client

client.once('ready', ()=>
{
    console.log('Sids music bot is online!');
});







client.login('OTY1NTM2MTk0NDUwNTcxMjc2.Yl0npw.WGgiR5hbvRR_uuIjqVHtH0TlIHM'); // logging into discord music bot