const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js");

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Displays details about the song that is currently playin!g"),

        run: async ({client, interaction}) =>
        {
            const queue = client.player.getQueue(interaction.guildId) // get the queue object and store it in a variable

            if(!queue)
            {
                return await interaction.editReply("Currently there are no songs in the queue!")
            }

            let progressBar = queue.createProgressBar(
            {
                queue: false, // queue for only single song
                length: 19 // 19 characters for string
            })


            const currentSong = queue.current // initial the currently playing song and store it

            await interaction.editReply(
            {
                embeds: [new MessageEmbed() // created embed message object
                .setThumbnail(currentSong.thumbnail) // set the current songs thumbnail
                .setDescription(`Currently Playing Song: [${currentSong.title}](${currentSong.url})\n\n` + "Progress bar: " + progressBar)],
            })
        }

}