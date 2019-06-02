const bot = require('../bot.js')
const nunjucks = require('nunjucks')
const fs = require('fs')
const helpJson = JSON.parse(fs.readFileSync('plugins/helpObject.json'))

bot.msg.react("✅")
bot.msg.author.send(nunjucks.render('plugins/helpTemplate.template', helpJson))
