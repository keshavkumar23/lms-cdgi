import Message from './Message'
import useGetMessages from '../../../hooks/chatAppHooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../../../hooks/chatAppHooks/useGetRealTimeMessage';

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((state) => state.message);
  return (
    <div className="p-4 flex-1 overflow-y-scroll custom-scrollbar">
      <div className="flex flex-col space-y">
        {messages && messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default Messages