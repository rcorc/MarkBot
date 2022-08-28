const Discord = require('discord.js')
require('dotenv').config()
const { Player } = require("discord-player")

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildVoiceStates
    ]
})

let bot = {
    client,
    prefix: 'markbot ',
    owners: ['274206665241395202']
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload)

// call our functions
client.loadEvents(bot, false)
client.loadCommands(bot, false)


client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

module.exports = bot

client.login(process.env.TOKEN)