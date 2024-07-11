import { useEffect } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { setMessages } from '../../slices/messageSlice';

const useGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.profile);
    const dispatch = useDispatch();
    console.log("Selected User in useGetMessage Hooks :",selectedUser);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/message/${selectedUser?._id}`);
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser?._id, dispatch]);
}

export default useGetMessages