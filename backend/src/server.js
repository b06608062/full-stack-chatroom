import http from 'http'
import express from 'express'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import { signUp, signIn, createRoom, input, clear } from './wssConnect'

dotenv.config();
if(!process.env.MONGO_URL){
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
};
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const channels = {};

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function () {
  console.log("mongo connected!");

  wss.on('connection', (ws) => {
    let username = undefined
    ws.onmessage = async (byteString) => {
        const { data } = byteString;
        const  [task, payload] = JSON.parse(data);
        switch(task){
            case 'signUp': {
              signUp(payload, ws, channels);
              break
            }
            case 'signIn': {
              if(signIn(payload, ws, channels)) username = payload.username;
              break
            }
            case 'creatRoom': {
              createRoom(payload, channels);
              break
            }
            case 'input': {
              input(payload, channels);
              break
            }
            case 'clear': {
              clear(payload, channels);
              break
            }
            default:
        }
    }
    ws.onclose = () => {
      delete channels[username];
    }
  })

  const port = process.env.PORT || 4000;
  server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
  });
});