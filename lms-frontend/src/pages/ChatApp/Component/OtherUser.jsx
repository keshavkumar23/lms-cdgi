import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../slices/profileSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((store) => store.profile.selectedUser);

  const selectedUserHandler = (user) => {
    if (!user || !user._id) {
      console.error("Invalid user or user ID is missing", user);
      return;
    }
    console.log("selected user is ", user);
    dispatch(setSelectedUser(user));
  };

  const isOnline = useSelector((state) =>
    state.profile.onlineUsers?.includes(user?._id)
  );

  React.useEffect(() => {
    console.log("selected user after dispatching is ", selectedUser);
  }, [selectedUser]);

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={` ${
          selectedUser?._id === user?._id ? "bg-[#d5e6f8] text-black" : "text-black"
        } flex gap-2 hover:text-black items-center hover:bg-[#d5e6f8] rounded p-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2 text-[#2a3547] capitalize">
            <p>{user?.firstName + " " + user?.lastName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
