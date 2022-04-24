const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song and play the next in queue!"),

        run: async ({client, interaction}) =>
        {
            const queue = client.player.getQueue(interaction.guildId) // get the queue object and store it in a variable

            if(!queue)
            {
                return await interaction.editReply("Currently there are no songs in the queue!")
            }

            const currentSong = queue.current

            queue.skips() // skips the current song and play the next in queue
            await interaction.editReply( // outputs an embed message that the current song has been skipped
            {
                embeds: 
                [
                    new MessageEmbed().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumbnail)
                ]
            })
        }

}