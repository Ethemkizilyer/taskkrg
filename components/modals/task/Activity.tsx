import Avatar from "@/assets/images/Avatar.png";
import Image from "next/image";

const ActivityCell = () => {
    return (
        <div className="flex gap-3 items-center p-3 text-sm text-gray-500">
            <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
            <Image className="w-full" src={Avatar} alt="Test"/>
        </div>
            <div className="min-w-64">
                <div id="name-and-time" className="flex gap-3 items-center">
                    <p id="full-name" className="font-medium text-black">Robbie Williams</p>
                    <p id="time">2 mins ago</p>
                </div>
                <div id="message">Invited <span className="text-indigo-700 font-medium">Robbie Williams</span> to the team</div>
            </div>
            <div className="flex flex-col justify-start">
                <p className="w-3 h-3 bg-green-500 rounded-full"></p>
            </div>
        </div>
    )
}
export default ActivityCell;