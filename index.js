const Discord = require("discord.js"); // import discord client
const dotenv = require("dotenv"); // used to get the token information
const { REST } = require("@discordjs/rest") ;
const { Routes } = require("discord-api-types/v9");
const fs = require("fs"); // used to read files
const{ Player } = require("discord-player"); // used to manage the music playing aspect of the bot

dotenv.config();
const TOKEN = process.env.TOKEN; // initialise token value

const LOAD_SLASH = process.argv[2] == "load"; // allows the user to load third argument

const CLIENT_ID = "965536194450571276";
const GUILD_ID = "965539137220399174";

// initialise discord client
const client = new Discord.Client({
    intents: ["GUILDS","GUILD_VOICE_STATES"] // let the bot know what guild we are in and the voice channel states
})

client.slashCommands = new Discord.Collection();

client.player = new Player(client, {
    ytdlOptions: // handle streaming of music
    {
        quality: "highestaudio", // stream highest quality of audio only
        highWaterMark: 1 << 25
    }
})

let botCommands = [];

// Read bot slash commands files
const slashCmdFiles = fs.readdirSync("./bot_commands").filter(file => file.endsWith(".js")); 
for (const file of slashCmdFiles)
{
    const slashCmd = require(`./bot_commands/${file}`); // pull contents from the files into the variable
    client.slashCommands.set(slashCmd.data.name, slashCmd);

    if(LOAD_SLASH)
    {
        botCommands.push(slashCmd.data.toJSON());// push data of the slash command into the commands array
    }
}

if(LOAD_SLASH)
{
    const rest = new REST({ version: "9"}).setToken(TOKEN);
    console.log("Slash commands are being deployed!");

    // Generates a URL which inserts the guild and client id to able to deploy the commands to a point in the API
    // which has the client and guild id/
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: botCommands})
    .then(() => 
    {
        console.log("Successfuly loaded the commands");
        process.exit(0); // stops the bot entirely
    })
    .catch((err) =>
    {
        if(err) // if an error occurs error messages are outputted
        {
            console.log(err);
            process.exit(1);
        }
    })
}
else
{
    client.on("ready", () => 
    {
        console.log(`Logged in as ${client.user.tag}`);
    })
    client.on("interactionCreate", (interaction) =>
    {
        async function manageCommand()
        {
            if (!interaction.isCommand)
            {
                console.log("Not a slash command!");
                return
            }

            const slashCmd = client.slashCommands.get(interaction.commandName); // get slash command from discord collection by name of interaction
            if(!slashCmd)
            {   
                interaction.reply("The command entered is not a valid slash command!");
            }

            await interaction.deferReply(); // creates time for user to reply and respond to the command
            await slashCmd.run({ client, interaction})
        }
        manageCommand();
    })

    client.login(TOKEN)
}

