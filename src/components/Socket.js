import socket from "@/socket";
import io from 'socket.io-client'
import { useSession, getSession, } from "next-auth/react";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/context";

let firstRender = true;

const Socket = ({ setDropdown }) => {
    const { data: session, update } = useSession();
    const { openConversations, setOpenConversations, setUnseenConvos, setConversations } = useContext(SocketContext);

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

            socket.io.emit('get conversation list');

            socket.io.on('private message', ({ message }) => {

                const checkExistingOpen = (open) => {

                    for (let i = 0; i < open.length; i++) {

                        if (open[i].with === message.from.userPath) {
                            return i;
                        }

                    }

                    return -1;

                }

                const checkExistingList = (list) => {

                    for (let i = 0; i < list.length; i++) {

                        if (list[i].to.userPath === message.from.userPath) {
                            return i;
                        }

                    }

                    return -1;

                }


                let openExists = -1;
                let listExists = -1;

                setOpenConversations((oldConvos) => {

                    openExists = checkExistingOpen(oldConvos);
                    const newConvos = [...oldConvos];

                    if (openExists > -1) {

                        newConvos[openExists].messages.push(message);

                    }

                    return newConvos;

                })

                setConversations((oldConvos) => {

                    listExists = checkExistingList(oldConvos);

                    const newConvos = [...oldConvos];

                    if (listExists > -1) {

                        const convo = {

                            created: message.created,
                            message: message.message,
                            unseen: newConvos[listExists].unseen + 1,
                            to: newConvos[listExists].to,
                            seen: message.seen,

                        }

                        if (openExists > -1) {

                            convo.unseen = 0;

                        }

                        newConvos[listExists] = convo;

                    }

                    return newConvos;
                })
            });

            socket.io.on('get conversation list', ({ conversations }) => {
                setConversations(conversations)
                let unseen = 0;

                conversations.forEach(convo => {
                    if (convo.unseen > 0) unseen++;
                });

                setUnseenConvos(unseen);

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
        socketInitializer();
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