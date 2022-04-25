const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skips the current song and goes to the specified track")
        .addNumberOption((option) =>
            option.setName("tracknumber").setDescription("Track to skip directly to").setMinValue(1).setRequired(true)),

        run: async ({client, interaction}) =>
        {
            const queue = client.player.getQueue(interaction.guildId) // get the queue object and store it in a variable

            if(!queue)
            {
                return await interaction.editReply("Currently there are no songs in the queue!")
            }

            const trackNumb = interaction.options.getNumber("tracknumber") // initalise the track number

            // checks is the user enters a valid track number
            if(trackNumb > queue.tracks.length)
            {
                return await interaction.editReply("Track Number is invalid and past the queue! Try again")
            }

            queue.skipTo(trackNumb - 1) // skips the current song and goes directly to the track number provided
            await interaction.editReply(`Song has been skiped to track number ${trackNumb}`) // ouputs message stating track has been successfully skipped to
        }

}