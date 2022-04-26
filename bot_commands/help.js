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
                .setDescription('The following is the music bot commands!')
                .addFields
                (
                    {name: 'Rule 1', value: 'Be Nice'}
                )

                .setImage('https://cdn.iconscout.com/icon/free/png-256/music-1404982-1185691.png')
                .setFooter({text: `Please check the music bot rules`})


            await interaction.editReply
            ({
                embeds: [embed]
            })
        }

}