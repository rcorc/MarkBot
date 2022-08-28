const { tryFunctionUnlessCooldown, sendFileViaURLInChannel } = require('../../util/functions')

// sends normal mark emote

const markWobbleImageURL = 'https://cdn.discordapp.com/attachments/987230161764225044/1012123951876546660/attachment.gif'
module.exports = {
    name: 'markWobble',
	run: async ({ message }) => {
		tryFunctionUnlessCooldown(message, function () { sendFileViaURLInChannel(message.channel, markWobbleImageURL) })
	},
}
