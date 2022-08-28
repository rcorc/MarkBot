const { tryFunctionUnlessCooldown, sendMessageInChannel } = require('../../util/functions')


// sends normal mark emote

const markEmoji = '<a:7markerplier:1011813380757127258>'

module.exports = {
    name: 'mark',
    run: async ({ message }) => {
		tryFunctionUnlessCooldown(message, function () { sendMessageInChannel(message.channel, markEmoji) })
    }
}