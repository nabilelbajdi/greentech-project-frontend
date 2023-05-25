import ContactFriend from "./ContactFriend";
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

const Widget = () => {
    const {data:session} = useSession();
    return (  
        <div className=" hidden h-screen sticky top-[220px] lg:flex flex-col w-[700px] p-2 mt-5">
           
           <div className=" outline p-8 mx-auto rounded-2xl outline-gray-400 shadow-md ">

            <div className="mb-5">
            <Image
            
            width={80}
            height={80}
         className=" rounded-full cursor-pointer  min-w-[50px] min-h-[50px] outline outline-4 outline-white m-auto"
            src={session.user.image}
        />

        
            
            </div>
            {contacts.map(contact =>(
                <ContactFriend key={contact.src} src={contact.src} name={contact.name} />
            ))}
            
        </div>
        </div>

    );
}
 
export default Widget;