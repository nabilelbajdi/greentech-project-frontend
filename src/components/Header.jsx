import { signOut, useSession } from "next-auth/react";

const Header = () => {

    const { data: session } = useSession();

    return (
        <header className="flex justify-between items-center h-12 p-4 bg-slate-600 w-full md:sticky md:top-0">
            <h1>Treehouse</h1>
            <div className="flex gap-4">
                {session.user.email}
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        </header>
    )

}

export default Header;
