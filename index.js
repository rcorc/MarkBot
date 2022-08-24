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
    console.log('msg content: ', message.content)
    if (new RegExp('\\b' + wordToMatch + '\\b').test(message)){
        message.channel.send(response)
    }
})

client.login(process.env.TOKEN)