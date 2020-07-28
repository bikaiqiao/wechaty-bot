const { Wechaty } = require("wechaty") // Wechaty核心包
const { PuppetPadplus } = require("wechaty-puppet-padplus") // padplus协议包
const Qrterminal = require("qrcode-terminal")//二维码包

const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: 'puppet_padplus_dd54e2b49f8b4217'
  }),
  name: 'JOE'
})

//const onRoomJoin = require("./onRoomJoin")
const Message = require("./Message")
//const onFriendShip = require("./onFriendShip")
bot
 .on("scan", (qrcode, status)=>{Qrterminal.generate(qrcode, { small: true })}) 
//  .on("room-join", onRoomJoin) // 加入房间监听
  .on("message", Message.onMessage) // 消息监听
//  .on("friendship", onFriendShip) // 好友添加监听
  .start()