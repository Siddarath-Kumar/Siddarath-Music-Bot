const { SlashCommandBuilder, EmbedAssertions } = require("@discordjs/builders")
const { MessageEmbed, DiscordAPIError } = require("discord.js");

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help for using music bot commands!"),

        run: async ({client, interaction}) =>
        {
            let embed = new MessageEmbed()
            
            embed
                .setColor('#304281')
                .setTitle('Music Bot Help Commands')
                .setDescription('The following is the music bot commands for Sids-Music-Bot!')
                .setThumbnail('https://cdn.pixabay.com/photo/2017/05/09/10/03/music-2297759_1280.png')
                .addFields
                (
                    {name: '/play search', value: 'Plays a song based on the provided keyword from YouTube.'},
                    {name: '/play song', value: 'Plays a song based on the provided URL from YouTube.'},
                    {name: '/play playlist', value: 'Plays a song playlist based on the provided playlist link from YouTube.'},
                    {name: '/queue', value: 'Shows the current queue of songs.'},
                    {name: '/quit', value: 'The music bot will stop playing music and disconnect.'},
                    {name: '/pause', value: 'Will pause the currently playing song.'},
                    {name: '/resume', value: 'Will resume the song playing in the queue.'},
                    {name: '/shuffle', value: 'Shuffles the queue of music.'},
                    {name: '/skip', value: 'Skips the current song and plays the next song in the queue.'},
                    {name: '/skipto', value: 'Skips the current song and goes to the specified track in the queue.'},
                    {name: '/info', value: 'Displays information about the current song playing.'}
                )
                .setImage('https://cdn.pixabay.com/photo/2021/09/11/03/27/music-6614542_1280.jpg')

            await interaction.editReply
            ({
                embeds: [embed]
            })
        }

}