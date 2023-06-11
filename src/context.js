import { createContext, useEffect, useState } from 'react';
export const SocketContext = createContext();

const Context = ({ children }) => {
    const [conversations, setConversations] = useState([]);
    const [openConversations, setOpenConversations] = useState([]);
    const [unseenConvos, setUnseenConvos] = useState(0);
    const [unseenNotifications, setUnseenNotifications] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {

        let unseen = 0;

        conversations.forEach(convo => {
            if (convo.unseen > 0) {
                const checkExistingOpen = (open) => {

                    for (let i = 0; i < open.length; i++) {

                        if (open[i].with === convo.to.userPath) {
                            return i;
                        }

                    }

                    return -1;

                }

                const openExists = checkExistingOpen(openConversations)

                if (openExists > -1) {



                } else {

                    unseen++;

                }

            }
        });

        setUnseenConvos(unseen);

    }, [conversations])

    return (

        <SocketContext.Provider value={{
            openConversations,
            setOpenConversations,
            unseenConvos,
            setUnseenConvos,
            conversations,
            setConversations,
            unseenNotifications,
            setUnseenNotifications,
            notifications,
            setNotifications,
            friends,
            setFriends
        }}>
            {children}
        </SocketContext.Provider>

    )
}

export default Context;