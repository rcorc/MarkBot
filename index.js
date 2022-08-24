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

let wordToMatch = 'mark'
let response = '<a:markerplier:1011813380757127258>'
client.on('messageCreate', message => {
    // console.log('msg content: ', message.content)

    // test if whole word is in message and send response if it is
    if (new RegExp('\\b' + wordToMatch + '\\b').test(message)) {
        // check and try timeout
        if (checkAndTryTimeout(message.author.id)) {

            // send message
            message.channel.send(response)
        }
    }
})


// check if the user is on timeout, and put them in timeout if they arent.
const timeout = new Set();
function checkAndTryTimeout(userID) {
    if (timeout.has(userID)) { // the user is on timeout, so do nothing and return false
        return false
    } else { // the user is not on timeout, so start their timeout and return true
        timeout.add(userID);
        setTimeout(() => {
            timeout.delete(userID);
        }, 60000);
        return true
    }
}

client.login(process.env.TOKEN)