const Discord = require('discord.js')
const { isWholeWordsInText } = require('../util/functions')

// event handler for messageCreate event
// messageCreate happens whenever a message is sent in the guild
const markTriggers = ['mark', 'markiplier', 'markerplier']
const markReverseTriggers = ['kram']
const markWobbleTriggers = ['mrak']

module.exports = {
    name: 'messageCreate', //must match file name
    run: async function runAll(bot, message) {
        console.log(`msg author: ${message.author.tag}, msg content: '${message.content}'`)
        const {client, prefix, owners} = bot

        // ignore the following message types:
        // if message was not sent as part of a guild
        if (!message.guild) return

        // if message was sent by bot
        if (message.author.bot) return

        // do mark triggers (they don't have a prefix)
        // search for triggers
        let markFound = isWholeWordsInText(message.content.toLowerCase(), markTriggers)
        let markReverseFound = isWholeWordsInText(message.content.toLowerCase(), markReverseTriggers)
        let markWobbleFound = isWholeWordsInText(message.content.toLowerCase(), markWobbleTriggers)

        // act if the triggers have been found
        if (markFound || markReverseFound || markWobbleFound) {
            if (markFound) {
                // get the command and run it
                try {
                       await client.commands.get('mark').run({message})
                } catch (error) {
                    console.error(error)
                }
            }
            if (markReverseFound) {
                try {
                    await client.commands.get('markReverse').run({message})
                } catch (error) {
                    console.error(error)
                }
            }
            if (markWobbleFound) {
                try {
                    await client.commands.get('markWobble').run({message})
                } catch (error) {
                    console.error(error)
                }
            }
            return
        }

        // if message doesn't start with the prefix
        if (!message.content.startsWith(prefix)) return


        // get command and args
        const args = message.content.slice(prefix.length).trim().split(/ +/g) // remove the prefix, cut out spaces, then split along spaces
        const cmdstr = args.shift().toLowerCase() // shift pops the first element of args

        let command = client.commands.get(cmdstr) // using cmdstr, get the command from the client.commands collection
        if (!command) return // if command is empty, it wasn't a valid command so ignore

        // permissions checking
        let member = message.member

        if (command.devOnly && !owners.includes(member.id)) {
            return message.reply('This command is only available to the bot owners')
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
            return message.reply('You do not have permission to use this command')
        }

        // call the command
        try {
            console.log('running command', message.content)
            await command.run({...bot, message, args})
        } catch (error) {
            let errMsg = error.toString()

            if(errMsg.startsWith('?')) { // convention of the person who wrote the tutorial is that errors with '?' are errors that are triggered manually
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            } else {
                console.error(error)
            }
        }
    }
}