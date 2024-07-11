import { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../../slices/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.profile);
  const { messages } = useSelector((state) => state.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Message that sender is sending", message);
      const res = await axios.post(
        `/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response is coming from server when I am sending msgs ", res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      console.log("Messages :", messages);
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="px-4 w-full"
    >
      <div className="relative flex right-4 w-full">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a message ....."
          className="text-sm block w-full p-3 pr-12 bg-[#d9e9f7] text-[#2A3547] outline-none placeholder:text-[#959ca8]"
        />
        <button
          type="submit"
          className="relative group hover:shadow-lg border-gray-500 hover:shadow-blue-500/50 transition ease-in-out duration-500 text-[#4a90e2] cursor-pointer border-none bg-[#d9e9f7] p-3 flex items-center justify-center box-border gap-2 max-w-full whitespace-nowrap z-1 hover:bg-[#4a90e2] hover:text-white ml-auto"
        >
          <IoSend className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
