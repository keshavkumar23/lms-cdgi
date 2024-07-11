import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, onlineUsers } = useSelector((state) => state.profile);
    const {user} = useSelector((state) => state.profile);

    console.log(
        "this is the selected user from message container ", selectedUser
    )

    // const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {selectedUser !== null ? (
                <div className="w-full flex flex-col">
                    <div className="flex gap-2 items-center bg-[#d9e9f7] px-4 py-2">
                        <div className={`avatar ${isOnline ? "online" : ""}`}>
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src={selectedUser?.image}
                                    alt={`profile-${selectedUser?.firstName}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between gap-2 text-[#2a3547] capitalize">
                                <p>{selectedUser?.firstName + " " + selectedUser?.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center w-full">
                    <h1 className="text-4xl text-white font-bold">
                        Hi, {user?.firstName}{" "}
                    </h1>
                    <h2 className="text-2xl text-white">Let's start conversation</h2>
                </div>
            )}
        </>
    );
};

export default MessageContainer;
