import { Input, Button, Typography, Form } from 'antd'
import { UserOutlined, CloseCircleFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { useState } from 'react'
import './button.css'
import { useUserChat } from './useUserChat'

const { Title } = Typography;

const Mask = styled.div`
  // Position
  position:absolute;
  top:0%;
  left:0%;

  // Display
  display:none;
  z-index:1001;

  // Box Model
  width:100%;
  height:100%;

  // Font or other
  background-color: #00000073;
`;

const Board = styled.div`
  // Position
  position:absolute;
  top:25%;

  // Display
  display:none;
  z-index:1002;

  // Box Model
  width:300px;
  height:250px;
  padding:8px;

  // Font or other
  background-color:white;
`;

const Log = () => {
    const { me, setMe, signUp, signIn, signUpBoard, setSignUpBoard } = useUserChat();
    const [password, setPassword] = useState("");

    const onFinish = (userInfo) => {
        userInfo.timestamp = new Date();
        signUp(userInfo);       
    };

    return(
        <> 
            <Title>Chat Room</Title>
            <Input 
                value={me}
                onChange={(e) => setMe(e.target.value)}
                size="large" 
                placeholder="Enter your name" 
                prefix={<UserOutlined />} 
                style={{ width: 300, marginTop: 30 }}
            />
            <Input.Password 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown= {(e) => {if(e.code==='Enter') signIn({ username: me, password })}}
                placeholder="Input password" 
                style={{ width: 300, marginTop: 5, padding: '6.5px 11px' }}
            />
            <Button type="primary" style={{ width: 300, marginTop: 5}} onClick={() => signIn({ username: me, password })}>Sign in</Button>
            <Button type="link" style={{ width: 300, marginTop: 5, color: '#0072E3' }}>忘記密碼</Button>
            <hr style={{ width: 300, border: '1px dashed #BEBEBE' }}></hr>
            <div className="button-container-2">
                <span className="mas">Sign up</span>
                <button id='work' type="button" name="Hover" onClick={() => {setSignUpBoard(true)}}>Sign up</button>
            </div>
            <Mask style={{  display: signUpBoard?"block":"none" }}/>
            <Board style={{  display: signUpBoard?"block":"none" }}>
                <h1>快速註冊</h1>
                <CloseCircleFilled style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '16px', cursor: 'pointer' }} onClick={() => {setSignUpBoard(false)}}/>
                <Form
                    onFinish={onFinish}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    
                </Form>
            </Board>
        </>
    )
}

export default Log;