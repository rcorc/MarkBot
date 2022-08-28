const { tryFunctionUnlessCooldown, sendFileViaURLInChannel } = require('../../util/functions')

// sends normal mark emote

const kramImageURL = 'https://cdn.discordapp.com/attachments/981576145701060680/1011887028725624872/kram.gif'
module.exports = {
    name: 'markReverse',
	run: async ({ message }) => {
		tryFunctionUnlessCooldown(message, function () { sendFileViaURLInChannel(message.channel, kramImageURL) })
	},
}
