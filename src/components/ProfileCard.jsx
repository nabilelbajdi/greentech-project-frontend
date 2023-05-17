import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileCard = () => {
    const{data:session} = useSession();
    return ( 
        <div className="hidden xl:flex flex-col w-[400px] p-2 ">
            <div className="outline outline-1 rounded-md">

            
            <div className="flex flex-col  p-3 space-y-2 justify-center items-center text-gray-500 mb-5">
            <Image
            
            width={100}
            height={100}
            className=" rounded-full cursor-pointer"
            src={session.user.image}
            />

            <button className=" bg-[#2F6575] text-white p-2 rounded-full">Visa min profil</button>
            </div>
            <div className=" w-full p-4 px-8">
            <div className="border-b-2 border-black">
                <p>Idag</p>
            </div>
            <p className="mt-2">Inga event hittade för <br/> måndag, 1 maj 2023</p>
            </div>
            </div>
            
            </div>
     );
}
 
export default ProfileCard;