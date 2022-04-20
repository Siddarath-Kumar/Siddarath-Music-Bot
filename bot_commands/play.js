const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player")

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Load and play music from YouTube")
        
        .addSubcommand((subcommand)=>
            subcommand.setName("song")
            .setDescription("Will load a single song from a YouTube url")
            .addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
        )
        
        .addSubcommand((subcommand)=>
           subcommand
           .setName("playlist")
           .setDescription("A playlist of songs is loaded from a specifed YoutTube url")
            .addStringOption((option)=> option.setName("url").setDescription("the playlists url").setRequired(true))
        )
        
        .addSubcommand((subcommand)=>
           subcommand
           .setName("search")
           .setDescription("Based on a provided keyword will search for the song")
            .addStringOption((option)=> option.setName("searchkeywords").setDescription("the search keywords").setRequired(true))
        ),
        
        // code is executed
        run: async({ client, interaction }) =>
        {
            if(!interaction.member.voice.channel)
            {
                return interaction.editReply("You are required to be in a voice channel to run this command!")
            }

            const queue = await client.player.createQueue(interaction.guild)
            if(!queue.connection)
            {
                await queue.connect(interaction.member.voice.channel) // connects to the vc the member is in
            }

            let embed = new MessageEmbed()

            if(interaction.options.getSubcommand() === "song")
            {
                let url =  interaction.options.getString("url") // store the users inputted url 

                // search song on youtube
                const searchResult = await client.player.search(url,
                {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO // user youtube video as the search engine type
                }) 

                if (searchResult.tracks.length === 0)
                {
                    return interaction.editReply("No results for the video was found!")
                }

                const currentSong = searchResult.tracks[0]
                await queue.addTrack(currentSong)

                embed   
                    .setDescription(`**[${currentSong.title}](${currentSong.url})** has been added to the queue!`)
                    .setThumbnail(currentSong.thumnail)
                    .setFooter({ text: `Duration: ${currentSong.duration}`})

            }
            else if(interaction.options.getSubcommand() === "playlist")
            {
                let url =  interaction.options.getString("url") // store the users inputted url 

                // search song on youtube
                const searchResult = await client.player.search(url,
                {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST // user youtube video as the search engine type
                }) 

                if (searchResult.tracks.length === 0)
                {
                    return interaction.editReply("No results for the video was found!")
                }

                const playlist = searchResult.playlist
                await queue.addTracks(searchResult.tracks)

                embed   
                    .setDescription(`**${searchResult.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the queue!`)
                    .setThumbnail(playlist.thumnail)
            }
            else if (interaction.options.getSubcommand() === "search")
            {
                let url =  interaction.options.getString("searchkeywords") // store the users inputted url 

                // search song on youtube
                const searchResult = await client.player.search(url,
                {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO // search for any type of platform eg spotify or soundcloud
                }) 

                if (searchResult.tracks.length === 0)
                {
                    return interaction.editReply("No results for the video was found!")
                }

                const currentSong = searchResult.tracks[0]
                await queue.addTrack(currentSong)

                embed   
                    .setDescription(`**[${currentSong.title}](${currentSong.url})** has been added to the queue!`)
                    .setThumbnail(currentSong.thumnail)
                    .setFooter({ text: `Duration: ${currentSong.duration}`})
            }

            if(!queue.playing) // if the song queue is not playing
            {
                await queue.play() // play the queue
                await interaction.editReply({
                    embeds: [embed] // display the embeds of the information
                })
            }
        }


}