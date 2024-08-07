import { MdMessage } from "react-icons/md";

const Menu=({props})=>{
return (
    <button className={`flex gap-1 flex-col items-center p-3 ${props.isActive ? "text-orange-400" : "text-gray-400"}`}>
        <MdMessage className={`w-10 h-10 p-2 rounded-lg ${props.isActive ? "bg-orange-50" : "bg-gray-50"}`}/>
        <p className="text-xs font-medium">{props.title}</p>
    </button>
)
}

export default Menu;