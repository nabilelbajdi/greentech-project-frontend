import { useSession } from "next-auth/react";

const BackendCall = () => {

    const { data: session, update } = useSession();


    const testBackendAuth = async (session) => {

        const response = await fetch('http://localhost:8008/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.jwtToken}`
            }
        });

        if (response.status === 401) {

            // session uppdateras inte som den ska och gammal token läses in, fixa!

            const updatedSession = await update();
            testBackendAuth(updatedSession);
            return;

        }

        if (!response.ok) {


            console.log('Something went wrong.');

        } else {

            console.log('Success!');
        }

    }

    return (

        <div>
            <button onClick={() => testBackendAuth(session)}>Click me</button>
        </div>

    )

}

export default BackendCall;