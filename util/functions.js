const fs = require('fs')
// helper functions for the program

// return all files in the given directory that have the specified ending
const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(file => file.endsWith(ending))
}

// check if the user is on timeout, and if they aren't run the function and put the user in time out. Then log either way
let timeout = new Set();
let timeoutExempt = ['274206665241395202', '887332329394159666', '893148333852471326', '670099443814760498'] // Elise, char, violet, ella
const tryFunctionUnlessCooldown = (message, sendMessage) => {
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
const isWholeWordsInText = (text, arr) => {
    for(const word of arr) {
        if (new RegExp('\\b' + word + '\\b').test(text)) {
            return true
        }
    }
    return false
}

// helper functions for sending messages

// sends a message in the same channel as the given message containing the given content
const sendMessageInChannel = (channel, content) => {
    channel.send(content)
}

// sends a message in the same channel as the given message containing the file found at the given URL
const sendFileViaURLInChannel = (channel, fileURL) => {
    channel.send({files: [fileURL]})
}

module.exports = {
    getFiles,
    tryFunctionUnlessCooldown,
    isWholeWordsInText,
    sendMessageInChannel,
    sendFileViaURLInChannel
}