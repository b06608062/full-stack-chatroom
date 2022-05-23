import Users from './models/users';
import ChatRooms from './models/chatRooms';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws);
};

const sendUsers = (payload, ws) => {
    sendData(['setUsers', payload], ws);
};

const sendMessages = (payload, ws) => {
    sendData(['updateMessages', payload], ws);
};

const sendRoom = (payload, ws) => {
    sendData(['createRoom', payload], ws);
};

const signUp = async (payload, ws, channels) => {
    const { username, password, timestamp } = payload;
    const user = await Users.findOne({ username });
    if (user) {
        sendStatus({ type: 'error', msg: `Username ${username} is existed.` }, ws);
        sendData(['signUp', false], ws);
    } else {
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new Users({ username, password: hash, timestamp });
        await newUser.save();
        sendStatus({ type: 'success', msg: "Your registration is successful!" }, ws);
        sendData(['signUp', true], ws);
        const users = await Users.find({});
        for (let key in channels) {
            sendUsers(users.map(e => e.username), channels[key]);
        }
    }
};

const signIn = async (payload, ws, channels) => {
    const { username, password } = payload;
    const user = await Users.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        Object.assign(channels, { [username]: ws });
        const users = await Users.find({});
        const userRooms = await ChatRooms.find({ members: username });
        sendStatus({ type: 'success', msg: `${username}, Welcome to your Chat Room!` }, ws);
        sendData(['signIn', userRooms], ws);
        sendUsers(users.map(e => e.username), channels[username]);
        return true;
    } else {
        sendStatus({ type: 'error', msg: "Incorrect username or password." }, ws);
        return false;
    }
};

const createRoom = async (payload, channels) => {
    const newRoom = new ChatRooms({ ...payload });
    await newRoom.save();
    const creator = payload.members[0];
    payload.members.forEach(e => {
        if (channels[e]) {
            sendRoom(payload, channels[e]);
            if (e === creator) sendStatus({ type: 'success', msg: "Create successfully!" }, channels[e]);
            else sendStatus({ type: 'success', msg: `${creator} invite you to Cha Cha Cha!` }, channels[e]);            
        }        
    });
};

const input = async (payload, channels) => {
    const { name, rId, body, timestamp } = payload;
    const room = await ChatRooms.findOne({ rId });
    room.messages = [...room.messages, { name, body, timestamp }];
    await room.save();
    room.members.forEach(e => {
        if (channels[e]) {
            sendMessages(payload, channels[e]);
            if (e === name) sendStatus({ type: 'success', msg: "Message sent." }, channels[e]);
            else sendStatus({ type: 'success', msg: "New message" }, channels[e]);            
        }
    });
};

const clear = async (payload, channels) => {
    const { rId } = payload;
    const room = await ChatRooms.findOne({ rId });
    room.messages = [];
    await room.save();
    room.members.forEach(e => {
        if (channels[e]) {
            sendData(['cleared', payload], channels[e]);
            sendStatus({ type: 'success', msg: "Message cleared." }, channels[e]);            
        }
    });
};

export { signUp, signIn, createRoom, input, clear };