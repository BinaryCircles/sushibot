const bot = require('../bot.js')
const fs = require('fs')
const reactionHandler = require('./reactionHandler.js')
let config = JSON.parse(fs.readFileSync('config.json'))
let hofList = []

if (reactionHandler.reaction.count >= config.hofCount) {

  let hofMessageObject = reactionHandler.reaction.message
  let userID = hofMessageObject.member.id
  let userAvatar = hofMessageObject.author.avatarURL()
  let messageChannel = hofMessageObject.channel.id
  let hofMessage = hofMessageObject.content
  let attachment = hofMessageObject.attachments.first()
  let messageID = hofMessageObject.id
  let messageLink = hofMessageObject.url

  if (fs.existsSync("./plugins/hof.txt")) {
    hofList = JSON.parse(fs.readFileSync("./plugins/hof.txt", 'utf8'))
  } else {
    fs.writeFileSync("./plugins/hof.txt", JSON.stringify(hofList), 'utf8')
  }

  if (hofList.includes(messageID)) {
    return
  } else {
    if (attachment == undefined) {
      bot.client.guilds.get(config.currentGuild).channels.get(config.hofChannel).send(
        {
          embed: {
            author: {
              name: "Hall of Fame",
              url: messageLink,
              iconURL: userAvatar,
              proxyIconURL: userAvatar
            },
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
                name: "ID",
                value: messageID,
                inline: true
              },
              {
                name: "Message",
                value: hofMessage,
                inline: false
              }
            ],
            footer: { text: 'BinaryCircles/sushibot' }
          }
        }
      )
    } else if (attachment.height != null && hofMessage.length == 0) {
      bot.client.guilds.get(config.currentGuild).channels.get(config.hofChannel).send(
        {
          embed: {
            author: {
              name: "Hall of Fame",
              url: messageLink,
              iconURL: userAvatar,
              proxyIconURL: userAvatar
            },
            image: { url: attachment.url },
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
                name: "ID",
                value: messageID,
                inline: true
              }
            ],
            footer: { text: 'BinaryCircles/sushibot' }
          }
        }
      )
    } else if (attachment.height != null && hofMessage.length > 0) {
      bot.client.guilds.get(config.currentGuild).channels.get(config.hofChannel).send(
        {
          embed: {
            author: {
              name: "Hall of Fame",
              url: messageLink,
              iconURL: userAvatar,
              proxyIconURL: userAvatar
            },
            image: { url: attachment.url} ,
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
                name: "ID",
                value: messageID,
                inline: true
              },
              {
                name: "Message",
                value: hofMessage,
                inline: false
              }
            ],
            footer: { text: 'BinaryCircles/sushibot' }
          }
        }
      )
    }

    hofList.push(messageID)
    fs.writeFileSync("./plugins/hof.txt", JSON.stringify(hofList), 'utf8')
  }

}
