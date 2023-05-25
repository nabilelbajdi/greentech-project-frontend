import Image from "next/image";
import IconElipsis from "./IconEllipsis";

const ContactFriend = ({src,name}) => {
    return ( 
    <div className="flex items-center justify-between w-[200px]">
     <div className=" flex items-center space-x-2 mb-2 relative
     hover:font-semibold p-2 rounded-xl cursor-pointer w-fit">
        <Image
        className=" rounded-full object-cover max-w-[50px] max-h-[50px]"
        src={src}
        width={50}
        height={50}
        />
        <p>{name}</p>
        <div className=" absolute bottom-2 left-8 bg-green-400 h-3 w-3 rounded-full"></div>
    </div>
    <IconElipsis/>
    </div>);
}
 
export default ContactFriend;