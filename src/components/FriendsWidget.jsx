import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon, CogIcon } from "@heroicons/react/solid";
import Contact from "./Contact";
import { useSession } from "next-auth/react";
import Image from "next/image";

const contacts =[
    {
        src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        name: "Eliza"
    },
    {
        src:"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        name: "Jennifer"
    },
    {
        src:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        name: "Aiden"

    },
    {
        src:"https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        name:"Tommy"
    }
]

const FriendsWidget = () => {
    const {data:session} = useSession();
    return (  
        <div className="flex lg:w-[700px] justify-between pr-3 m-auto">
            <div className="flex flex-col xl:hidden mb-2 p-2  justify-end items-center text-gray-500 relative">
                <Image
            
                width={50}
                height={50}
             className=" rounded-full cursor-pointer  min-w-[50px] min-h-[50px]"
                src={session.user.image}
            />

            <CogIcon className="absolute bottom-2 left-10 h-5 w-5 rounded-full"/>
            </div>
            <div className="flex-col text-black font-semibold">
                <h2 className="text-xl">Mina Vänner</h2>
                <div className="flex">
                
                {contacts.map(contact =>(
                <Contact key={contact.src} src={contact.src} name={contact.name} />
            ))}
                </div>
                
            </div>
                        
        </div>
    );
}
 
export default FriendsWidget;