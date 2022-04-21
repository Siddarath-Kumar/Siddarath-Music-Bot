const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = 
{
    date: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Outputs the current song queue")
        .addNumberOption((option) => option.setName("page").setDescription("Page number of the queue").setMinValue(1)), // display pages of songs using pagination system

    run: async ({ client, interaction }) =>
    {
        const queue = client.player.getQueue(interaction.guildId) // get queue object
        if (!queue || !queue.playing)
        {
            return await interaction.editReply("Currently there is no songs in the queue!")
        }

        const pageCount = Math.ceil(queue.track.length / 10) || 1
        const page = (interaction.options.getNumber("page") || 1) -1 //get page number and minus 1 for the index value

        if (page > pageCount)
        {
            return await interaction.editReply(`Page is invalid. A total of ${pageCount} pages of songs is available`)
        }

        const queueString = queue.tracks.slice(page * 10,  page * 10 + 10).map((song, i) =>
        {
            return `**${page * 10 + 1 +1}.** \`[${song.duration}]\` ${song.title} == <@${song.requestedBy.id}>`
        }).join("\n") // take first 10 songs for the page and map the song information to a string

        const currentSong = queue.current

        await interaction.editReply
        ({
            embeds: 
            [
                new MessageEmbed()
                // show details of the current song playing else if no current song id play show none 
                .setDescription(`**Currently playing the song**\n` + 
                (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None")
                + `\n\n**Queue**\n${queueString}`)
                .setFooter({
                    text: `Page ${page + 1} / ${pageCount}`
                })
                .setThumbnail(currentSong.setThumbnail)
                 
            ]
        })
    }
}