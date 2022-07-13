const { SlashCommandBuilder, EmbedAssertions } = require("@discordjs/builders")
const { MessageEmbed, DiscordAPIError } = require("discord.js");

module.exports=
{
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Info about Sids-Music-Bot!"),

        run: async ({client, interaction}) =>
        {
            let embed = new MessageEmbed()
            
            embed
                .setColor('#304281')
                .setTitle('Info about Sids-Music-Bot!')
                .setDescription('A simple discord music bot developed to play and organise music while on discord voice calls.')
                .setThumbnail('https://cdn.pixabay.com/photo/2017/05/09/10/03/music-2297759_1280.png')
                .addFields
                (
                    {name: 'Instructions', value: 'Use /help to learn all the music bot commands!'},
                    {name: 'Developed by:', value: 'Siddarath Kumar'},
                    {name: 'Inspiration', value: 'Followed a YouTube tutorial but customised to make it my own!'},
                    {name: 'My GitHub', value: 'GitHub.com/siddarath-kumar'}
                )
                .setImage('https://cdn.pixabay.com/photo/2021/09/11/03/27/music-6614542_1280.jpg')
                
            await interaction.editReply
            ({
                embeds: [embed]
            })
        }

}