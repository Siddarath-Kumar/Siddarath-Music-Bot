const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const discordVC = require('@discordjs/voice');

module.exports = 
{
    name: 'play',
    description: 'Joins the voice channel and plays a video or music from YouTube',
    async execute(message, args)
    {
        const voiceChannel = message.member.voice.channel;

        // Checks if the user is in the voice channel
        if(!voiceChannel)
        {
            return message.channel.send('You are required to be in a voice channel to run this command!');            
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);


        if(!permissions.has('CONNECT'))
        {
            return message.channel.send('You dont have the CONNECT permission to run this command!');            
        }

        if(!permissions.has('SPEAK'))
        {
            return message.channel.send('You dont have the SPEAK permission to run this command!');            
        }

        if(!args.length)
        {
            return message.channel.send('You are required to send a second argument!');            
        }

        
        const connection = discordVC.joinVoiceChannel(
        {
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        // const player = discordVC.createAudioPlayer();
        // const musicSource = discordVC.createAudioResource(stream);
       

        //const connection = await voiceChannel.join(); // where the bot will join the voice channel

        const videoFinder = async (query) => 
        {
            const videoResult = await ytSearch(query); // store list of yt vids that is link with the keyword sent 

            // if videos result length is more than 1 then get the first video of the array, else return null
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        
        if(video)
        {
            const stream =  ytdl(video.url, {filter: 'audioonly'}); // filters out the selected youtube videos audio into stream variable
            connection.play(stream, {seek: 0, volume : 1}) // use the connection to play the audio of the music
            .on('finish', () =>
            {
                voiceChannel.leave(); // leave the discord once finished playing the music
            });

            //await message.reply(`Currently playing: ***${video.title}*** :thumbsup:`);
        }
        else
        {
            message.channel.send('Unable to find requested video :thumbsdown:');

        }
    }
}