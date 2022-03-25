import styled from 'styled-components'
import { Tag, Input } from 'antd'

const RoomBox = styled.div`
    width: 100%;
    height: 100%;
`

const MessagesBox = styled.div`
    width: 100%;
    height: 80%;
    background: #eeeeee52;
    overflow: auto;
    padding: 20px;
`;

const InputBox = styled.div`
    width: 100%;
    height: 20%;
    padding: 20px;  
`

const P1 = styled.p`
    text-align: right;
    
    & span {
        margin-left: 8px;
        margin-right: 0;
    }
`;

const P2 = styled.p`
    text-align: left;
`;

const Room = ({ messages, me, rId, sendMessage, body, setBody, members }) => {
    return(
        <RoomBox>
            <p style={{ marginBottom: 0, cursor: 'default', fontWeight: 'bolder', color: 'darkgray'}}>{`Room members: ${members.join(', ')}`}</p>
            <MessagesBox>
                {messages.length===0?(<p style={{ color: '#ccc' }}>No messages...</p>)
                :
                (messages.map(({ name, body }, i) => (
                    name===me?
                    <P1 key={i}>{body}<Tag color='green'>{name}</Tag></P1>
                    :
                    <P2 key={i}><Tag color='blue'>{name}</Tag>{body}</P2>
                )))}
            </MessagesBox>
            <InputBox>
                <Input.Search
                    value={body}
                    enterButton="Send"
                    placeholder="Type a message here..."
                    onChange={(e) => setBody(e.target.value)}
                    onSearch={() => {
                        sendMessage({ name: me, rId, body, timestamp: new Date() });
                        setBody("");
                    }}
                ></Input.Search>            
            </InputBox>
        </RoomBox>
    )
};

export default Room;