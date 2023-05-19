import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../../server/db/prisma";

const register = async (req, res) => {

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
                case 'PUT':
                    const { firstName, lastName, country, city, dateOfBirth } = req.body;

                    let incomplete = false;

                    if (firstName.length < 1) {
                        setFirstNameIncomplete(true);
                        incomplete = true;
                    }

                    if (lastName.length < 1) {
                        setLastNameIncomplete(true);
                        incomplete = true;
                    }

                    if (country.length < 1) {
                        setCountryIncomplete(true);
                        incomplete = true;
                    }

                    if (city.length < 1) {
                        setCityIncomplete(true);
                        incomplete = true;
                    }

                    if (dateOfBirth.length < 1) {
                        setDateOfBirthIncomplete(true);
                        incomplete = true;
                    }

                    if (incomplete) {
                        res.status(400).end('Incomplete request');
                        return;
                    }

                    let nameCount = 0;

                    const generatePath = async () => {

                        let path = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

                        if (nameCount > 0) {

                            path += nameCount;

                        }

                        const checkPath = await prisma.user.findUnique({
                            where: { userPath: path }
                        });



                        if (checkPath) {
                            nameCount++;
                            return generatePath();

                        } else {

                            return path;

                        }

                    }

                    const path = await generatePath();

                    const user = await prisma.user.update({
                        where: {
                            id: prismaUser.id,
                        },
                        data: {
                            firstName,
                            lastName,
                            country,
                            city,
                            dateOfBirth: new Date(dateOfBirth),
                            fullyRegistered: {
                                set: true
                            },
                            userPath: path,
                        },

                    });

                    if (!user) {

                        res.status(500).end('Something went wrong');

                    }

                    res.status(200).end();
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

export default register;