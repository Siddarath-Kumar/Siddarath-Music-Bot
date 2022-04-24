const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Will stop the bot and clear the music queue"),

        run: async ({client, interaction}) =>
        {
            const queue = client.player.getQueue(interaction.guildId) // get the queue object and store it in a variable

            if(!queue)
            {
                return await interaction.editReply("Currently there are no songs in the queue!")
            }

            queue.destroy() // destroys the queue and the bot exits the voice channel
            await interaction.editReply("Goodbye! Sids Music Bot has left the Voice Channel.") // Goodbye message is presented
        }

}