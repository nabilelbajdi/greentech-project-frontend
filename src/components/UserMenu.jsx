
import Image from "next/image";
import { useEffect, useState } from "react";
import DotDotDotMeny from "./DotDotDotMeny";
import UserMenuDropDown from "./UserMenuDropDown";
import socket from "@/socket";
const { useSession, signOut } = require("next-auth/react")



const UserMenu = ({size}) => {
    const { data: session, status } = useSession();
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuContent, setMenuContent] = useState([]);
    useEffect(() => {

        const content = [
            {
                title: `${session.user.firstName} ${session.user.lastName}`,
                link: `/${session.user.userPath}`,
            },
            {
                title: `Logga ut`,
                callback: () => {
                    console.log('Logga ut');
                    socket.io.disconnect();
                    signOut();
                },
            },
        ]

        setMenuContent(content);

    }, [])

    let pic;

    if (session.user.profilePicture) {

        pic = session.user.profilePicture

    } else {

        pic = session.user.image;

    }

    const imageClick = () => {
        console.log('user menu')
    }

    return (


        <div className='relative flex items-center'>
            <button onClick={() => {
                setMenuVisible(value => !value)
            }}>
                <Image
                    src={pic}
                    alt='Min profilbild'
                    height={size ? `${size}`:32}
                    width={size ? `${size}`:32}
                    className='rounded-full border-2 border-chas-primary cursor-pointer aspect-square object-cover hover:opacity-90'
                />
            </button>

            {menuVisible && <UserMenuDropDown menuContent={menuContent} setMenuVisible={setMenuVisible} />}
        </div>



    )

}
// <BellIcon className='headerIcon' />

export default UserMenu;