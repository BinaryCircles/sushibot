const bot = require('../bot.js')
const fs = require('fs')
const reactionHandler = require('./reactionHandler.js')
let roleAssigners = []
let teamReacts = {
  '🛠': "584611664620552193",
  '📝': "584611637487468545",
  '🔌': "584611603018809344",
  '💻': "584611481279135754",
  '💰': "584613531094089748",
  '🎨': "584611520529563668",
  '🐴': "586355728067985408",
  '🔵': "586355758577352704"
}

if (fs.existsSync("./plugins/roleassigners.txt")) {
  roleAssigners = JSON.parse(fs.readFileSync("./plugins/roleassigners.txt"))
} else {
  return
}

if (roleAssigners.includes(reactionHandler.reaction.message.id)) {

  let currentMember = reactionHandler.reaction.message.mentions.members.first()
  let addedRoles = []
  let removedRoles = []

  for (let i = 0; i < Object.keys(teamReacts).length; i++) {
    if (reactionHandler.reaction.message.reactions.get(Object.keys(teamReacts)[i]).count > 1) {
      let currentReact = Object.keys(teamReacts)[i]
      if (currentMember.roles.filter(role => role.id.includes(teamReacts[currentReact])).first() != undefined) {
        currentMember.roles.remove(currentMember.roles.filter(role => role.id.includes(teamReacts[currentReact])).first())
        removedRoles.push(currentReact)
      } else {
        currentMember.roles.add(currentMember.guild.roles.filter(role => role.id.includes(teamReacts[currentReact])).first())
        addedRoles.push(currentReact)
      }
    }
  }

  roleAssigners.splice(roleAssigners.indexOf(reactionHandler.reaction.message.id), 1)
  fs.writeFileSync("./plugins/roleassigners.txt", JSON.stringify(roleAssigners))
  reactionHandler.reaction.message.channel.send(`<@${reactionHandler.reaction.message.mentions.members.first().id}> added ${addedRoles} and removed ${removedRoles}`)

}


// remove from role assigners when done
