const bot = require('../bot.js')
const fs = require('fs')
let config = JSON.parse(fs.readFileSync('config.json'))

let reaction = bot.reaction
let user = bot.user

// plugin references
if (reaction.emoji.identifier == config.hofEmoji) {
  module.exports = { reaction: reaction, user: user }
  delete require.cache[require.resolve(`./hof.js`)]
  require(`./hof.js`)
}
