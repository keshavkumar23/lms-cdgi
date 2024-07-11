import ChatSidebar from "./Component/ChatSidebar";
import MessageContainer from "./Component/MessageContainer";
function ChatApp() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-5 md:w-3/4 lg:w-2/3 h-[75vh] rounded-lg overflow-hidden bg-white shadow-lg">
        <ChatSidebar />
        <MessageContainer />
      </div>
    </div>

  );
}

export default ChatApp;
