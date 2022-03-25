import { message } from 'antd'

const displayStatus = (payload) => {
  if(payload.msg){
    const { type, msg } = payload;
    const content = { content: msg, duration: 1 };
    switch(type){
      case 'success': {
        message.success(content);
        break
      }
      case 'info': {
        message.info(content);
        break
      }
      case 'error':
      default:
        message.error(content);
        break
    };
  };
};

export default displayStatus;