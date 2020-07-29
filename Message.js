const {
  message
} = require('wechaty')
const {
  room
} = require('wechaty')
const axios = require('axios')
const config = require("./config")
const bot = require('./index')

async function onMessage(msg) {
  //发消息人
  //消息内容
  //消息是否来自群聊
  const contact = msg.from()
  const room = msg.room()
  if (room) {
    //这里是群聊信息
    console.log('群聊信息显示在此处' + room)
  } else {
    //这里是私聊信息
    await sendMessage(msg, contact.id)
    console.log(msg.text())

  }
}

async function sendMessage(msg, userID) {
  let roomListName = Object.keys(config.room.roomList)
  if (msg.text() == "好友圈") {
    const room = await bot.Room.find({
      id: config.room.roomList[msg.text()]
    })
    if ((await room.has(msg.from()))) {
      await msg.say("您已经在房间中了")
    } else {
      await room.add(msg.from())
      await msg.say("已发送群邀请")
    }
  } else if (msg.text() == "wechaty") {
    let roomInfo = `当前管理群聊有${roomListName.length}个，回复群聊名即可加入`
    msg.say(roomInfo)
  } else {
    await axios.post('https://api.ownthink.com/bot', {
        spoken: msg.text(),
        appid: "592184dccabdef65e21c97f289303a17",
        userid: userID
      })
      .then(function (response) {
        msg.from().say(response.data.data.info.text);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
module.exports = {
  onMessage
}