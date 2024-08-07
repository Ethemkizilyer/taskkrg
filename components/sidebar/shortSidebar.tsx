import Icon from "@/assets/icons/header/Icon";
import Avatar from "@/SideAvatar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "../providers/userProvider";

const ShortSidebar=()=>{
    const router =useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const { user, setIsUserLogin, setUser } = useUser();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex flex-col justify-between bg-[#363F72] w-fit text-white px-1 py-5 h-full">
            <div className="flex gap-3 flex-col">
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
            </div>
            <div className="flex gap-3 flex-col">
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
                <span className="rounded-lg hover:bg-gray-400 p-3">
                    <Icon />
                </span>
                <span className="avatar relative rounded-full">
                <div onClick={toggleDropdown} className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
            <Image className="w-full" src={Avatar} alt="Test"/>
        </div>
        {isOpen && (
         <div className="absolute -top-12 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
         <div className="p-1">
             <button
                 onClick={() =>{ 
                    setIsUserLogin(false)
                    setUser(null)
                    localStorage.removeItem("user")}}
                 className="block px-4 py-2 text-sm hover:text-gray-700 hover:bg-gray-100 bg-red-700 w-full text-left"
             >
                 Logout
             </button>
         </div>
     </div> )}
                </span>
            </div>
        </div>
    )
}

export default ShortSidebar;