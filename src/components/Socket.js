import socket from "@/socket";
import io from 'socket.io-client'
import { useSession, getSession, } from "next-auth/react";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/context";

let firstRender = true;

const Socket = ({ conversationsList, setConversationsList, setDropdown }) => {
    const { data: session, update } = useSession();
    const { openConversations, setOpenConversations } = useContext(SocketContext);

    const socketInitializer = async () => {

        if (socket.io) {
            return;
        }

        console.log('Initializing socket.io')

        if (!session) {
            console.log('Socket initialization failed')
            return;
        }

        socket.io = io('http://localhost:8008', {
            auth: {
                token: session.user.jwtToken
            }
        });

        socket.io.on('connect', () => {
            console.log('socket connected')

            socket.io.on('private message', ({ message }) => {

                setOpenConversations((oldConvos) => {

                    const checkExisting = () => {

                        for (let i = 0; i < oldConvos.length; i++) {

                            if (oldConvos[i].with === message.from.userPath) {
                                return i;
                            }

                        }

                        return -1;

                    }

                    const exists = checkExisting()

                    if (exists > -1) {

                        const newConvos = [...oldConvos];
                        newConvos[exists].messages.push(message);
                        return newConvos;

                    } else {

                        return oldConvos;

                    }

                })

            });

            socket.io.on('get conversation list', ({ conversations }) => {
                setConversationsList(conversations)
            })

            socket.io.on('get conversation', (dbConversation) => {

                const newConversation = {
                    with: dbConversation.userPath,
                    messages: [],
                    img: null,
                    displayName: null,
                }

                const checkExisting = () => {

                    for (let i = 0; i < openConversations.length; i++) {

                        if (openConversations[i].with === newConversation.with) {
                            return true;
                        }

                    }

                }

                if (checkExisting()) return;


                newConversation.messages = dbConversation.messages;
                newConversation.img = dbConversation.img;
                newConversation.displayName = dbConversation.displayName;

                setOpenConversations(oldConversations => {
                    return [...oldConversations, newConversation]
                })

                setDropdown('')

            })
        });

        socket.io.on('connect_error', (err) => {
            console.log('connect error due to:', err.message)
        });
    }

    const initSocket = async () => {
        const freshSession = await getSession()
        socketInitializer(freshSession, openConversations, conversationsList, setOpenConversations, setConversationsList);
    }

    useEffect(() => {
        if (!socket.io && firstRender) {
            firstRender = false;
            console.log('Init sockets')
            initSocket();

        }
    }, [])



    return <></>;

}



export default Socket;