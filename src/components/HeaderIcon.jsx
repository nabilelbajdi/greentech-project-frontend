const HeaderIcon = ({Icon,active}) => {
    return (  
        <div className=" flex items-center cursor-pointer md:px-10 sm:h-14
         md:hover:bg-gray-100 rounded-xl active:border-b-4
          active:border-green-500 group">
            <Icon className={`h-5 group-hover:text-green-500 text-center sm:h-7 
            mx-auto text-gray-500 ${active && 'text-green-500'}`} />
        </div>
    );
}
 
export default HeaderIcon;