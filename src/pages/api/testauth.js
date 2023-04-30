import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const testauth = async (req, res) => {

    const session = await getServerSession(req, res, authOptions);

    if (session) {

        res.send({
            content: 'This is protected content. You are one of the lucky ones.'
        })

    } else {

        res.send({
            error: 'You must be signed in to view protected content.'
        })

    }

}

export default testauth;