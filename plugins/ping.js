const bot = require('../bot.js')

bot.msg.channel.send("pong, ``" + bot.client.ws.shards.get(0).ping + "`` ms")
