const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

// this does the playing of the audio

module.exports = {
    name: 'playfull',
    run: async ({ client, message }) => {

        // message.reply('play command detected')

        let authorAsGuildMember = message.guild.members.cache.get(message.author.id)

        // check if author is in a voice channel
        if (!authorAsGuildMember.voice.channel) {
            return message.channel.send('You must be in a VC to use this command')
        }

        const queue = await client.player.createQueue(message.guild)
		if (!queue.connection) await queue.connect(authorAsGuildMember.voice.channel)

        let url = 'https://www.youtube.com/watch?v=iOztnsBPrAA' // url of desired markiplier episode
        const result = await client.player.search(url, {
            requestedBy: authorAsGuildMember,
            searchEngine: QueryType.YOUTUBE_VIDEO
        })
        if (result.tracks.length === 0) {
            return interaction.editReply("No results")
        }

        const song = result.tracks[0]
        await queue.addTrack(song)

        // message.channel.send(`**[${song.title}](${song.url})** has been added to the Queue`)
        // message.channel.send(`Duration: ${song.duration}`)
        console.log('playing', `**[${song.title}](${song.url})** has been added to the Queue`)

        if (!queue.playing) await queue.play()
    }
}