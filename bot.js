// initialization

'use strict'

const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')

// global variables

let config
let plugins = []

// initialize plugins
let pluginsDirectory = fs.readdirSync("plugins")
for (let i = 0; i < pluginsDirectory.length; i++) {
  if (pluginsDirectory[i].endsWith(".js")) {
    plugins.push(pluginsDirectory[i].split(".")[0])
  }
}

// listeners

// primary message listener
bot.on('message', msg => {

  // check for % at beginning of message
  if (msg.content.startsWith("%")) {
    let command = msg.content.split("%")[1]
    if (plugins.includes(command)) {
      module.exports = { client: bot, msg: msg }
      delete require.cache[require.resolve(`./plugins/${command}.js`)]
      require(`./plugins/${command}.js`)
    }
  }

})

// global functions

// load configuration
function loadConfig(callback) {
  config = JSON.parse(fs.readFileSync('config.json'))
  console.log('read config from `config.json`')

  if (config.token === undefined || config.token.length < 1) {
    console.log('no bot token is set in `config.json`, killing bot')
  } else {
    bot.login(config.token)
  }
}

bot.once('ready', () => {
  console.log('sushibot initialized')
})

// start bot
loadConfig()
