# Web Programming 2021

## HW8([Task description](https://github.com/b06608062/full-stack-chatroom/blob/master/hw8.pdf))
![This is an image](https://github.com/b06608062/full-stack-chatroom/blob/master/demo_image/截圖%202022-03-25%20下午8.57.04.png)

## Run in local
1. Download and Install
```
git clone https://github.com/b06608062/full-stack-chatroom.git
cd ./full-stack-chatroom
yarn install
```
2. Add .env file and fill the MONGO_URL with mongodb url.(You can refer to [.env.defaults](https://github.com/b06608062/full-stack-chatroom/blob/master/backend/.env.defaults))
4. Open two terminal windows, and go to ```/full-stack-chatroom``` folder.
5. In one window, run ```yarn server``` for **backend**.
6. The other window, run ```yarn start``` for **frontend**.
7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## App 說明

＊實作使用者註冊與登入

＊實作 `passward` bcrypt加密，使用者密碼以不可逆hash形式儲存

＊實作後端密碼驗證

＊實作 local storage，前端重新整理或重開 input box 中會自動顯示最後一次 sign in 時
的名字

＊實作 `clear` button 

＊實作 `one2one`、`many2many` 以及 `單人聊天室`

＊實作 `displayStatus` 即時訊息通知

＊實作新增聊天室，被邀請者如果在線會即時更新聊天室清單

＊實作聊天室發送訊息，聊天室成員如果在線會即時收到 `new message`

＊透過 WebSocket 傳送 `new message` 僅傳送必要訊息到前端更新

＊實作 `Tabs` 切換各個聊天室

＊實作對方的對話靠左邊 (<名字> <訊息>)，自己的回話靠右邊 (<訊息> <名字>)

＊支援客製化聊天室名稱，相同名稱也不會衝突

＊實作顯示聊天室成員

＊可以同時使用多個聊天室



