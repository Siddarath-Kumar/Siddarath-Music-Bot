const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Will pause the music"),

        run: async ({client, interaction}) =>
        {
            const queue = client.player.getQueue(interaction.guildId) // get the queue object and store it in a variable

            if(!queue)
            {
                return await interaction.editReply("Currently there are no songs in the queue!")
            }

            queue.setPaused(true) // pauses the queue of music
            await interaction.editReply("Music is now paused! Type `/resume` to resume the music.") // Pause and resume message is outputted
        }

}