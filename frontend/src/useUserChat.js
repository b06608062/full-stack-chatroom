import { createContext, useContext, useState, useEffect } from 'react'
import displayStatus from './displayStatus'

const client = new WebSocket('ws://localhost:4000');
console.log(client);

const sendData = async (data) => {
    client.send(JSON.stringify(data));
};

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const UserChatContext = createContext({

});

const UserChatProvider = (props) => {
    const [me, setMe] = useState(savedMe || "");
    const [online, setOnline] = useState(false);
    const [chatRooms, setChatRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState({});
    const [signUpBoard, setSignUpBoard] = useState(false);
    
    const sendMessage = (payload) => {
        if(payload.body.trim().length===0){
            displayStatus({ type: "error", msg: "Message body is empty." });
            return
        }
        sendData(['input', payload]);
    };

    const clearMessage = (payload) => {
        sendData(['clear', payload]);
    };

    const createRoom = (payload) => {
        sendData(['creatRoom', payload]);
    };

    const signUp = (payload) => {
        if(payload.username.indexOf(' ')!==-1){
            displayStatus({ type: "error", msg: "Invaild username." });
            return
        }
        sendData(['signUp', payload]);
    };

    const signIn = (payload) => {
        if(payload.username.length===0) displayStatus({ type: "error", msg: "Missing username." });
        else if (payload.password.length===0) displayStatus({ type: "error", msg: "Missing password." });
        else sendData(['signIn', payload]);
    }

    useEffect(() => {
        if (online) localStorage.setItem(LOCALSTORAGE_KEY, me);
    }, [online, me]);

    useEffect(() => {
        displayStatus(status);
    }, [status]);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch(task){
            case 'status': {
                setStatus(payload);
                break
            }
            case 'signUp': {
                if(payload) setSignUpBoard(false);
                break
            }
            case 'signIn': {
                setOnline(true);
                setChatRooms(payload);
                break
            }
            case 'setUsers': {
                setUsers(payload);
                break
            }
            case 'updateMessages': { 
                const { name, rId, body, timestamp } = payload;
                const newChatRooms = [...chatRooms];
                const room = newChatRooms.find(room => room.rId===rId);
                room.messages = [...room.messages, {name, body, timestamp}]
                setChatRooms(newChatRooms);
                break
            }
            case 'creatRoom': {
                const newChatRooms = [...chatRooms, payload];
                setChatRooms(newChatRooms);
                break
            }
            case 'cleared': {
                const { rId } = payload;
                const newChatRooms = [...chatRooms];
                newChatRooms.find(room => room.rId===rId).messages = [];
                setChatRooms(newChatRooms);    
                break            
            }
            default:
                break
        };
    };

    return (
        <UserChatContext.Provider
          value={{
            me,
            online,
            chatRooms,
            users,
            signUpBoard,
            setSignUpBoard,
            setMe,
            signIn,
            signUp,
            createRoom,
            sendMessage,
            clearMessage
          }}
          {...props}
        />
      )
};

function useUserChat() {
    return useContext(UserChatContext)
};
  
export { UserChatProvider, useUserChat };