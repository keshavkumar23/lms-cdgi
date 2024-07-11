import OtherUser from './OtherUser';
import { useSelector } from "react-redux";

const OtherUsers = () => {
    const { otherUsers } = useSelector(store => store.profile);
    if (!otherUsers) return;

    return (
        <div className='overflow-y-auto no-scrollbar flex-1'>
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }

        </div>
    )
}

export default OtherUsers