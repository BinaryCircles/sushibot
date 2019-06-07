const bot = require('../bot.js')
const fs = require('fs')
let roleAssigners = []

if (fs.existsSync("./plugins/roleassigners.txt")) {
  roleAssigners = JSON.parse(fs.readFileSync("./plugins/roleassigners.txt"))
} else {
  fs.writeFileSync("./plugins/roleassigners.txt", JSON.stringify(roleAssigners))
}

bot.msg.reply("react with roles you would like to add/remove\n(🛠 mech, 📝 design, 🔌 electrical, 💻 programming, 💰 business, 🎨 imagery/media, 🐴 rhs, 🔵 stem)\nhit ✅ when you're done")
  .then(roleMessage => {
    roleMessage.react('🛠')
    roleMessage.react('📝')
    roleMessage.react('🔌')
    roleMessage.react('💻')
    roleMessage.react('💰')
    roleMessage.react('🎨')
    roleMessage.react('🐴')
    roleMessage.react('🔵')
    roleMessage.react('✅')
    roleAssigners.push(roleMessage.id)
    fs.writeFileSync("./plugins/roleassigners.txt", JSON.stringify(roleAssigners))
  })
