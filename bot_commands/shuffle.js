const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles the queue of music"),

        run: async ({client, interaction}) =>
        {
            const queue = client.player.getQueue(interaction.guildId) // get the queue object and store it in a variable

            if(!queue)
            {
                return await interaction.editReply("Currently there are no songs in the queue!")
            }

            queue.shuffle() // shuffles the queue of music
            await interaction.editReply(`The queue of ${queue.tracks.length} songs have been shuffled!`) // Message to state the shuffle has been done
        }

}