// stops bot from playing

module.exports = {
    name: 'stop',
	run: async ({ client, message }) => {
		const queue = client.player.getQueue(message.guildId)

		if (!queue) {
            return message.reply('no markerplier')
        }

		queue.destroy()
	},
}
