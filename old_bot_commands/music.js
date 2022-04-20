module.exports=
{
    name: 'music',
    description: "This is a music command that will provide a link to a specific music video on youtube!!",
    execute(message, args)
    {
        message.channel.send('https://www.youtube.com/watch?v=gfHbg53ykPY&ab_channel=KSI');
    }
}