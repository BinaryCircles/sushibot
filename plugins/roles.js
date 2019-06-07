const bot = require('../bot.js')
const fs = require('fs')
let config = JSON.parse(fs.readFileSync('config.json'))
let roleAssigners = []

if (fs.existsSync("./plugins/roleassigners.txt")) {
  roleAssigners = JSON.parse(fs.readFileSync("./plugins/roleassigners.txt"))
} else {
  fs.writeFileSync("./plugins/roleassigners.txt", JSON.stringify(roleAssigners))
}

if (bot.msg.member.roles.filter(role => role.id.includes(config.teamRoleID)).first() != undefined) {
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
}
