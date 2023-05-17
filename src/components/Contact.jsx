import Image from "next/image";
const Contact = ({src,name}) => {
    return ( 
    <div>
    <div className=" flex items-center space-x-2 mb-2 relative
     p-2 rounded-xl cursor-pointer">
        <Image
        className=" rounded-full object-cover max-w-[50px] max-h-[50px]"
        src={src}
        width={50}
        height={50}
        />
        <div className=" absolute bottom-3 left-10 bg-green-400 h-3 w-3 rounded-full"></div>
        
        
    </div> 
    
    </div>);
}
 
export default Contact;