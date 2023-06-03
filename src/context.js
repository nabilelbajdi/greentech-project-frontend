import { createContext, useState } from 'react';
export const SocketContext = createContext();

const Context = ({ children }) => {
    const [openConversations, setOpenConversations] = useState([]);

    return (

        <SocketContext.Provider value={{
            openConversations,
            setOpenConversations,
        }}>
            {children}
        </SocketContext.Provider>

    )
}

export default Context;