import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../../server/db/prisma";

const confirm = async (req, res) => {

    try {

        const session = await getServerSession(req, res, authOptions);

        if (session) {
            const prismaUser = await prisma.user.findUnique({
                where: { email: session.user.email }
            })

            if (!prismaUser) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { method } = req;

            switch (method) {
                case 'POST':
                    const { userId } = req.body;

                    if (!prismaUser.id === userId) {
                        res.status(403).end('You can´t deny a friend request from yourself.');
                        return;
                    };

                    const checkUser = await prisma.user.findUnique({
                        where: {
                            id: userId
                        },
                        include: {
                            friendRequests: true,
                            friendRequestsSent: true,
                            friends: true,
                        }
                    })

                    if (!checkUser) {
                        res.status(404).end('User does not exist.');
                        return;
                    }

                    let allOk = false;

                    checkUser.friendRequestsSent.forEach(user => {
                        if (user.id === prismaUser.id) allOk = true;
                    });
                    checkUser.friends.forEach(user => {
                        if (user.id === prismaUser.id) allOk = false;
                    });

                    if (!allOk) {

                        res.status(403).end('Can not create friend relation.');
                        return;

                    }

                    const receiverUser = await prisma.user.update({

                        where: {
                            id: userId,
                        },
                        data: {
                            friendRequestsSent: {
                                disconnect: {
                                    id: prismaUser.id,
                                },
                            },
                        },

                    });

                    const senderUser = await prisma.user.update({

                        where: {
                            id: prismaUser.id,
                        },
                        data: {
                            friendRequests: {
                                disconnect: {
                                    id: userId,
                                },
                            },
                        },
                    });

                    res.status(200).send({ userPath: receiverUser.userPath });
                    break;

                default:
                    res.status(405).send();
            }

        } else {

            res.status(403).end('You must be signed in to do this.')

        }

    } catch (e) {

        res.status(500).send({ error: e.message });

    }
}

export default confirm;