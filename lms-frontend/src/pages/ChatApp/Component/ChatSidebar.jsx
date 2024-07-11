// ChatSidebar.js

import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers } from "../../../slices/profileSlice";
import { apiConnector } from "../../../services/apiConnector";
import { profileEndpoints } from "../../../services/apis";

const { GET_OTHER_USER_DETAILS_API } = profileEndpoints;

const ChatSidebar = () => {
    const [search, setSearch] = useState("");
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async (e) => {
            try {
                const response = await apiConnector("GET", `${GET_OTHER_USER_DETAILS_API}/${user?._id}`, null, {
                    Authorization: `Bearer ${token}`,
                });
                console.log("GET_OTHER_USERS_DATA_API API RESPONSE............", response.data);
                const foundUser = response?.data; // Adjust this based on your API response structure
                if (response?.data.length > 0) {
                    toast.success("Users found!");
                    dispatch(setOtherUsers(foundUser));
                } else {
                    toast.error("User not found!");
                }
            } catch (error) {
                console.log("GET_OTHER_USERS_DATA_API API ERROR............", error);
                toast.error("Could Not Get OTHER_USERS_DATA");
            }
        };
        fetchOtherUsers()
    }, [])

    return (
        <div className="p-4 flex flex-col bg-white">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col relative left-3 capitalize">
                    <div className="text-[#2a3547]">{user?.firstName + user?.lastName}</div>
                    <div className="text-zinc-400">{user?.accountType}</div>
                </div>
            </div>
            <form
                // onSubmit={searchUser}
                className="flex flex-col items-center mb-4"
            >
                <div className="flex relative">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-md px-4 py-2 bg-white text-base placeholder:text-[#959ca8] text-[#2A3547] border outline-[#e3e8ef]"
                        type="text"
                        placeholder="Search connections"
                    />
                    <div className="absolute right-3 top-50% translate-y-2 outline-none text-[#757575] bg-white cursor-pointer">
                        <BiSearchAlt2 className="w-5 h-5" />
                    </div>
                </div>
            </form>
            <div className="divider px-3 border mb-1"></div>
            <OtherUsers />
        </div>
    );
};

export default ChatSidebar;
