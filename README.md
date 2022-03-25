# Web Programming 2021

## HW8([Task description](https://github.com/b06608062/full-stack-chatroom/blob/master/hw8.pdf))
![This is an image](https://github.com/b06608062/full-stack-chatroom/blob/master/demo_image/截圖%202022-03-25%20下午8.57.04.png)

## Main function
* User **sign up** and **log in**.
* Backend **password encryption** by bcrypt.
* Implement frontend **local storage** to save user_id.
* Support **create chatroom**、**add room members** and **customized roomname**.
* Support **self**、**one2one** and **many2many** chatroom types.
* Support **send message**、**clear messages** and **new message info**.
* Can **switch the chatroom** and **display room members**

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
8. 
