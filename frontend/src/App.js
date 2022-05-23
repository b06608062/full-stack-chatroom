import styled from 'styled-components';
import { useUserChat } from './useUserChat';
import Log from './log';
import ChatRooms from './chatRooms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  // 對齊交錯軸線中央
  justify-content: center;  // 對齊主軸線中央
  margin: auto;
  width: 100%;
  height: 100vh;
`;

function App() {
  const { online } = useUserChat();

  return (
    <Wrapper style={{ backgroundColor: online ? 'white' : 'aliceblue' }}>
      {online ? <ChatRooms /> : <Log />}
    </Wrapper>
  );
};

export default App;
