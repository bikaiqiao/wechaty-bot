const {
  Friendship
} = require("wechaty")
// const { Contact } = require("wechaty")
const bot = require('./index')
async function onFriendShip(friendship) {
  try {
    console.log(`received friend event.`)
    switch (friendship.type()) {

      // 1. New Friend Request

      case Friendship.Type.Receive:
        // console.log(friendship)
        if (friendship.hello() == "ding") {
          console.log("验证正确添加好友")
          await friendship.accept()
          let friend=await bot.Contact.load(friendship.payload.contactId)
          console.log(friend)
          friend.say("hello,my name is joe")
        }
        break

        // 2. Friend Ship Confirmed

      case Friendship.Type.Confirm:
        console.log(`friend ship confirmed`)
        break
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  onFriendShip
}