const Discord = require("discord.js") // import discord client
const dotenv = require=("dotenv") // used to get the token information
const { REST } = require("@discordjs/rest") 
const { Routes } = require("@discord-api-types/v9")
const fs = require("fs") // used to read files
const{ Player } = require("discord-player") // used to manage the music playing aspect of the bot

dotenv.config()
const TOKEN = process.env.TOKEN // initialise token value

const LOAD_SLASH = process.argv[2] == "load" // allows the user to load third argument

const CLIENT_ID = "965536194450571276"
const GUILD_ID = "965539137220399174"

// initialise discord client
const client = new Discord.client({
    intents: ["GUILDS","GUILD_VOICE_STATES"] // let the bot know what guild we are in and the voice channel states
})

client.slashCommands = new Discord.Collection()

client.player = new Player(client, {
    ytdlOptions: // handle streaming of music
    {
        quality: "highestaudio", // stream highest quality of audio only
        highWaterMark: 1 << 25
    }
})

let botCommands = []

// Read bot slash commands files
const slashCmdFiles = fs.readdirSync("./bot_commands").filter(file => file.endsWith(".js")) 
for (const file of slashCmdFiles)
{
    const slashCmd = require(`./sash/${file}`) // pull contents from the files into the variable
    client.slashCommands.set(slashCmd.data.name, slashCmd)

    if(LOAD_SLASH)
    {
        botCommands.push(slashCmd.data.toJSON()) // push data of the slash command into the commands array
    }


}
