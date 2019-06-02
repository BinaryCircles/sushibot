const bot = require('../bot.js')
const fs = require('fs')
const reactionHandler = require('./reactionHandler.js')
let config = JSON.parse(fs.readFileSync('config.json'))
let hofList = []

if (reactionHandler.reaction.count >= config.hofCount) {

  let userID = reactionHandler.reaction.message.member.id
  let userAvatar = reactionHandler.reaction.message.author.avatarURL()
  let messageChannel = reactionHandler.reaction.message.channel.id
  let hofMessage = reactionHandler.reaction.message.content
  let messageID = reactionHandler.reaction.message.id

  if (fs.existsSync("./plugins/hof.txt")) {
    hofList = JSON.parse(fs.readFileSync("./plugins/hof.txt", 'utf8'))
  } else {
    fs.writeFileSync("./plugins/hof.txt", JSON.stringify(hofList), 'utf8')
  }

  if (hofList.includes(messageID)) {
    return
  } else {
    bot.client.guilds.get(config.currentGuild).channels.get(config.hofChannel).send(
      {
        embed: {
          author: {
            name: "Hall of Fame",
          },
          thumbnail: { url: userAvatar },
          color: 0xffbaf9,
          fields: [
            {
              name: "User",
              value: `<@${userID}>`,
              inline: true
            },
            {
              name: "Channel",
              value: `<#${messageChannel}>`,
              inline: true
            },
            {
              name: "Message",
              value: hofMessage,
              inline: true
            },
            {
              name: "ID",
              value: messageID,
              inline: true
            }
          ],
          footer: { text: 'BinaryCircles/sushibot' }
        }
      }
    )

    hofList.push(messageID)
    fs.writeFileSync("./plugins/hof.txt", JSON.stringify(hofList), 'utf8')
  }

}
