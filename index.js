const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

let markTriggers = ['mark', 'markiplier', 'markerplier']
let markEmoji = '<a:7markerplier:1011813380757127258>'
let kramTriggers = ['kram']
let kramImageURL = 'https://cdn.discordapp.com/attachments/981576145701060680/1011887028725624872/kram.gif'
let markWobbleTriggers = ['mrak']
let markWobbleImageURL = 'https://cdn.discordapp.com/attachments/987230161764225044/1012123951876546660/attachment.gif'
client.on('messageCreate', message => {
    console.log(`msg author: ${message.author.tag}, msg content: '${message.content}'`)

    // search for triggers
    let markFound = isWholeWordsInText(message.content.toLowerCase(), markTriggers)
    let kramFound = isWholeWordsInText(message.content.toLowerCase(), kramTriggers)
    let markWobbleFound = isWholeWordsInText(message.content.toLowerCase(), markWobbleTriggers)

    // act if the triggers have been found
    if (markFound) {
        tryFunctionUnlessCooldown(message, function() {sendMessageInChannel(message.channel, markEmoji)})
    }
    if (kramFound) {
        tryFunctionUnlessCooldown(message, function() {sendFileViaURLInChannel(message.channel, kramImageURL)})
    }
    if (markWobbleFound) {
        tryFunctionUnlessCooldown(message, function() {sendFileViaURLInChannel(message.channel, markWobbleImageURL)})
    }
})


// check if the user is on timeout, and if they aren't run the function and put the user in time out. Then log either way
let timeout = new Set();
let timeoutExempt = ['274206665241395202']
function tryFunctionUnlessCooldown(message, sendMessage) {
    if (timeout.has(message.author.id)) { // the user is on timeout, so log and return false
        console.log(`cooldown for '${message.author.tag}' comment: '${message.content}'`)
        return false
    } else { // the user is not on timeout, so do thing, send log, start their timeout, and return true
        sendMessage()
        console.log(`sending for '${message.author.tag}' comment: '${message.content}'`)

        // do timeout if the author is not exempt from timeout
        if (timeoutExempt.includes(message.author.id)) {
            // do nothing
        } else {
            timeout.add(message.author.id);
            setTimeout(() => {
                timeout.delete(message.author.id);
            }, 60000);
        }
        return true
    }
}

// helper function to check if any of the given whole words are in the message and return whether or not it was found
function isWholeWordsInText(text, arr) {
    for(const word of arr) {
        if (new RegExp('\\b' + word + '\\b').test(text)) {
            return true
        }
    }
    return false
}

// helper functions for sending messages

// sends a message in the same channel as the given message containing the given content
function sendMessageInChannel(channel, content) {
    channel.send(content)
}

// sends a message in the same channel as the given message containing the file found at the given URL
function sendFileViaURLInChannel(channel, fileURL) {
    channel.send({files: [fileURL]})
}

client.login(process.env.TOKEN)