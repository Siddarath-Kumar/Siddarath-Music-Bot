const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Will resume the music"),

        run: async ({client, interaction}) =>
        {
            const queue = client.player.getQueue(interaction.guildId) // get the queue object and store it in a variable

            if(!queue)
            {
                return await interaction.editReply("Currently there are no songs in the queue!")
            }

            queue.setPaused(false) // resumes the queue of music
            await interaction.editReply("Music is now resumed! Type `/pause` to pause the music.") // Pause and resume message is outputted
        }

}