import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { selectedUser } = useSelector((store) => store.profile);
  const scroll = useRef();
  const {user} = useSelector((store) => store.profile);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div ref={scroll} className={`flex ${message?.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
        <div className={`flex items-center gap-2 ${message?.senderId === user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="chat-image avatar m-1">
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <img
                alt="User avatar"
                src={message?.senderId === user?.id ? user?.image : selectedUser?.image}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className={`chat-bubble p-2 px-4 rounded-md ${message?.senderId === user?._id ? 'bg-gray-300 text-black' : 'bg-[#F2F6FA] text-[#2a3547]'}`}>
              {message?.message}
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Message;
