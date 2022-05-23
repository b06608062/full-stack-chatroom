import { Tabs, Radio, Button, Select, Input } from 'antd';
import { useState, useRef } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useUserChat } from './useUserChat';
import Room from './room';
import './chatRoom.css';
import { v4 as uuidv4 } from 'uuid';
import displayStatus from './displayStatus';

const { TabPane } = Tabs;
const { Option } = Select;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & h1 {
        margin: 0;
        margin-right: 20px;
        font-size: 3em;
    }
`;

const AddButton = styled(PlusOutlined)`
    padding: 10px;
    cursor: pointer;

    &:hover {
        color: #1890ff;
    }
`;

const Mask = styled.div`
   // Position
   position: absolute;
   top: 0%;
   left: 0%;

   // Display
   display: none;
   z-index: 1001;

   // Box Model
   width: 100%;
   height: 100%;

   // Font or other
   background-color: #00000073;
`;

const AddBoard = styled.div`
    // Position
    position: absolute;

    // Display
    display: none;
    z-index: 1002;

    // Box Model
    width: 455px;
    height: 300px;

    // Font or other
    background-color: white;

    .add-room-title {
        font-weight: 500;
        font-size: 16px;
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
    }

    .add-room-close-btn {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        padding: 0;
        color: #00000073;
        background: 0 0;
        border: 0;
        outline: 0;
        cursor: pointer;
        width: 57px;
        height: 57px;
    }

    .add-room-close-btn:hover {
        color: black;
    }

    .add-room-box {
        padding: 16px;
    }

    .add-room-select-box {
        padding: 16px;
    }

    .add-room-input-box {
        padding: 16px;
    }
`;

const ChatRooms = () => {
    const [mode, setMode] = useState();
    const [select, setSelect] = useState([]);
    const [rName, setrName] = useState("");
    const [body, setBody] = useState("");
    const [page, setPage] = useState("");
    const { me, chatRooms, users, sendMessage, clearMessage, createRoom } = useUserChat();
    const ref1 = useRef();
    const ref2 = useRef();
    
    const handleModeChange = e => {
        setMode(e.target.value);
    }

    const openBoard = () => {
        ref1.current.style.display = 'block';
        ref2.current.style.display = 'block';
    }

    const closeBoard = () => {
        ref1.current.style.display = 'none';
        ref2.current.style.display = 'none';
    }

    const handleSelect = e => {
        setSelect([...e]);
    }

    const handleDelete = () => {
        page === "" ? clearMessage({ rId: chatRooms[0].rId }) : clearMessage({ rId: page });
    }

    const handleCreateRoom = () => {
        if (select.length === 0) {
            displayStatus({ type: "error", msg: "At least one member." });
            return
        } else if (rName.trim().length === 0) {
            displayStatus({ type: "error", msg: "Invaild roomname." });
            return
        }
        const members = [me, ...select.filter(e => e !== me)];
        const newRoom = {
            rName: rName.trim(),
            rId: uuidv4(),
            members: members,
            timestamp: new Date(),
            messages: []
        };
        createRoom(newRoom);
        closeBoard();
    }

    return (
    <>
        <div>
            <Title>
                <h1>{`${me}'s Chat Room`}</h1>
                <Button type='primary' onClick={handleDelete} disabled={chatRooms.length === 0} danger>Clear</Button>
            </Title>
            <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                <Radio.Button value="top">Horizontal</Radio.Button>
                <Radio.Button value="left">Vertical</Radio.Button>
            </Radio.Group>
            <AddButton onClick={openBoard}/>
            {chatRooms.length > 0 ?
            <Tabs tabPosition={mode} style={{ height: 500, width: 600 }} onChange={e => {setBody(""); setPage(e);}}>
                {chatRooms.map(room => (
                    <TabPane tab={`${room.rName}`} key={room.rId}>
                        <Room messages={room.messages} me={me} rId={room.rId} sendMessage={sendMessage} body={body} setBody={setBody} members={room.members}/>
                    </TabPane>))}
            </Tabs>
            :
            <div style={{ height: 500, width: 600 }}></div>
            }
        </div>
        <Mask ref={ref1}/>
        <AddBoard ref={ref2}>
            <div className="add-room-title">新增聊天室</div>
            <button className="add-room-close-btn" onClick={closeBoard}><CloseOutlined /></button>
            <div className="add-room-box">
                <div className="add-room-select-box">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Click to select..."
                        onChange={handleSelect}
                    >   
                        {
                            users.map(
                                user => <Option key={user}>{user}</Option>
                            )
                        }
                    </Select>
                </div>
                <div className="add-room-input-box">
                    <Input.Group>
                        <Input value={rName} onChange={e => setrName(e.target.value)} style={{ width: 'calc(100% - 200px)' }} placeholder="Input your roomname"/>
                        <Button type="primary" onClick={handleCreateRoom}>Create</Button>
                    </Input.Group>
                </div>
            </div>
        </AddBoard>
    </>
    );
};

export default ChatRooms;