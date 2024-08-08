
import ActivityCell from "./Activity";
import Menu from "./rightMenu";
import { useEffect, useState } from "react";
import moment from "moment";
import { FaFlag, FaPlus } from "react-icons/fa";
import { MdAdd, MdAttachFile, MdChevronRight, MdClose, MdExpandLess, MdExpandMore, MdFileCopy, MdFilterList, MdHome, MdLink, MdMoveToInbox, MdOpenInNew, MdRadioButtonUnchecked, MdSearch, MdStar } from "react-icons/md";
import { IoMdRadioButtonOn } from "react-icons/io";
import { LuCircleEllipsis,LuDiamond } from "react-icons/lu";
import { FaRegCalendarDays } from "react-icons/fa6";
import Image from "next/image";
import Avatar from "@/assets/images/Avatar.png";

const TaskDetail = ({ props }) => {
    const [isCloseButtonClicked, setIsCloseButtonClicked] = useState(false);
    if (!props.isTaskDetailOpen) return null;
    useEffect(() => {
        if (isCloseButtonClicked) props.closeDetail();
    }, [isCloseButtonClicked]);

    const handleClick = () => {
        setIsCloseButtonClicked(true);
    }
    const [activeTab, setActiveTab] = useState('attach');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div
        id="default-modal"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto p-4 md:p-6 bg-gray-900 bg-opacity-50">
            <div className="relative w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div id="header" className="flex items-center justify-between border-b p-4 md:p-5">
                    <div className="left flex gap-3 items-center">
                        <MdExpandLess className="text-gray-700 w-5" />
                        <MdExpandMore className="text-gray-700 w-5" />
                        <MdHome className="text-gray-700 w-5" />
                        <MdChevronRight className="text-gray-500 w-5" />
                        <p>25 proje</p>
                        <MdChevronRight className="text-gray-500 w-5" />
                        <p>Projects</p>
                        <MdChevronRight className="text-gray-500 w-5" />
                        <p className="text-blue-500 font-semibold">Frontend Case</p>
                        <MdMoveToInbox  className="text-gray-500 w-5" />
                    </div>
                    <div className="right flex gap-3 items-center">
                        <LuCircleEllipsis className="text-gray-500 w-5" />
                        <MdOpenInNew className="text-gray-500 w-5" />
                        <MdStar  className="text-gray-500 w-5" />
                        <MdClose className="text-gray-500 flex items-center justify-center w-7 h-7 p-1 rounded-full hover:bg-red-500 hover:text-white" onClick={props.closeDetail} />
                    </div>
                </div>
                <div id="body" className="p-4 md:p-3 overflow-y-auto flex justify-between items-start">
                    <div id="content" className="space-y-4 flex-auto">
                        <div id="task-content" className="flex items-start justify-between">
                            <div>
                                <div className="flex gap-3 items-center">
                                    <IoMdRadioButtonOn size={32}  />
                                    <p className="font-bold text-xl max-w-[350px] text-gray-700">{props.task.name || `Bu örnek görevdir. Örnek görevin
                                        içerigine dair açiklama detail'da
                                        bulunmaktadır.`}
                                    </p>
                                </div>
                                <p className="text-gray-500 flex gap-3 p-5" id="id">ID:#{props.task.id}<span>
                                    <MdFileCopy  className="w-4" /></span></p>
                            </div>
                            <div>
                                <div id="date" className="border flex gap-3 p-3 rounded-lg">
                                    <MdRadioButtonUnchecked  />
                                    <p>{moment(props?.task?.startDate).format("DD.MM.YYYY") || "null"} - {moment(props.task.endDate).format("DD.MM.YYYY") || "null"}</p>
                                </div>
                            </div>
                        </div>
                        <div id="task-info" className="flex gap-10 items-center font-semibold text-gray-700">
                            <div id="task" className="flex gap-3 flex-col p-3 items-start">
                                <p>Task Status</p>
                                <p className="text-black">Open</p>
                            </div>
                            <div id="assignment" className="flex gap-3 flex-col p-3 items-start">
                                <p>Assignment</p>
                                <div className="persons text-white">
X
                                </div>
                            </div>
                            <div id="priotry" className="flex gap-3 flex-col p-3 items-start">
                                <p>Priotry</p>
                                <FaFlag color={props?.flags[props?.task?.flagId - 1]?.color} strokeWidth={5}/>
                            </div>
                        </div>
                        <div id="task-description" className="text-gray-500 flex gap-3 flex-col">
                            <p className="text-lg text-gray-700">Description</p>
                            <p>{props.task.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tempore repudiandae et. Aliquam, ducimus? Eaque, fugit? Soluta animi ut maiores facilis praesentium maxime, doloremque illo optio suscipit provident natus consectetur."}</p>
                        </div>
                        <div id="task-operations" className="border rounded-lg">
                        
            {/* Tab Headers */}
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                    <li role="presentation">
                        <button
                            type="button"
                            role="tab"
                            aria-controls="attach"
                            aria-selected={activeTab === 'attach'}
                            className={`flex p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'attach' ? 'text-purple-600 border-purple-600' : 'text-gray-500 hover:text-gray-600'
                            }`}
                            onClick={() => handleTabClick('attach')}
                        >
                            <MdAttachFile />
                            <p>Attachment</p>
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            type="button"
                            role="tab"
                            aria-controls="sub-task"
                            aria-selected={activeTab === 'sub-task'}
                            className={`flex p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'sub-task' ? 'text-purple-600 border-purple-600' : 'text-gray-500 hover:text-gray-600'
                            }`}
                            onClick={() => handleTabClick('sub-task')}
                        >
                            <MdAttachFile />
                            <p>Sub Task</p>
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            type="button"
                            role="tab"
                            aria-controls="comment"
                            aria-selected={activeTab === 'comment'}
                            className={`flex p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'comment' ? 'text-purple-600 border-purple-600' : 'text-gray-500 hover:text-gray-600'
                            }`}
                            onClick={() => handleTabClick('comment')}
                        >
                            <span><MdAttachFile /></span>
                            <span>Comment</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Tab Content */}
            <div id="default-tab-content">
                {/* Attachment Tab Content */}
                {activeTab === 'attach' && (
                    <div id="attach" role="tabpanel" aria-labelledby="attach" className="gap-3 flex-col p-3 ">
                        
<div className="flex items-start gap-2.5">
<div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
            <Image className="w-full" src={Avatar} alt="Test"/>
        </div>
   <div className="flex flex-col gap-2.5">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
         <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col">
         <div className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-xl p-2">
            <div className="me-2">
               <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                  <svg fill="none" aria-hidden="true" className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                     <g clip-path="url(#clip0_3173_1381)">
                        <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                        <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                        <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                        <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"/>
                        <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"/>
                        <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                     </g>
                     <defs>
                        <clipPath id="clip0_3173_1381">
                           <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                        </clipPath>
                     </defs>
                  </svg>
                  Flowbite Terms & Conditions
               </span>
               <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                  12 Pages 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  18 MB 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  PDF
               </span>
            </div>
            <div className="inline-flex self-center items-center">
               <button className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600" type="button">
                  <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                     <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                  </svg>
               </button>
            </div>
         </div>
      </div>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
</div>

                    </div>
                )}

                {/* Sub Task Tab Content */}
                {activeTab === 'sub-task' && (
                    <div id="sub-task" role="tabpanel" aria-labelledby="sub-task" className="flex justify-between gap-4 p-3">
                        <div>
                        <div className="left">
                            <div className="content flex gap-3">
                                <div className="content-left flex gap-1 items-center text-gray-700">
                                    <IoMdRadioButtonOn className="w-5" />
                                    <p className="font-medium">Task Content</p>
                                </div>
                                <div className="content-right flex gap-1 items-center text-gray-400 text-sm">
                                    <MdAttachFile className="w-4" />
                                    <p>#2334455</p>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="date flex gap-3 text-gray-400">
                                <div className="date-left flex gap-1 items-center">
                                    <FaRegCalendarDays className="w-5" />
                                    <p>05.02.2024 - 10.02.2024</p>
                                </div>
                                <div className="date-right flex gap-1 items-center text-sm">
                                    <LuDiamond className="w-4" />
                                    <p>Milestone Name</p>
                                    <FaFlag className="w-4 text-red-500" strokeWidth={5} />
                                </div>
                            </div>
                        </div>
                        <div className="text-white">
                        This is a sample comment. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.</div>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
            <Image className="w-full" src={Avatar} alt="Test"/>
        </div>
                    </div>
                )}

                {/* Comment Tab Content */}
                {activeTab === 'comment' && (
                    <div id="comment" role="tabpanel" aria-labelledby="comment" className="gap-3 flex-col p-3">
                            <div className="flex mt-4">
        <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
            <Image className="w-full" src={Avatar} alt="Test"/>
        </div>

        <div className="ml-3">
            <div className="flex gap-2">
                <p id="full-name" className="font-medium text-black">Lana Steiner</p>
                    <p id="time">2 mins ago</p>
                </div>
                <div id="message">Invited <span className="text-indigo-700 font-medium">Alisa Hester</span> to the team</div><div className="m-2 border rounded-lg p-2 text-purple-800">This is a sample comment. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
            </div>
        </div>
    </div>
    <div className="flex mt-4">
        <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
            <Image className="w-full" src={Avatar} alt="Test"/>
        </div>

        <div className="ml-3">
            <div className="flex gap-2">
                <p id="full-name" className="font-medium text-black">Lana Steiner</p>
                    <p id="time">2 mins ago</p>
                </div>
                <div id="message">Invited <span className="text-indigo-700 font-medium">Alisa Hester</span> to the team</div><div className="m-2 border rounded-lg p-2 text-purple-800">This is a sample comment. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
            </div>
        </div>
    </div>

                    </div>
                )}
            </div>
        
                        </div>
                    </div>
                    <div id="activity" className="flex-3">
                        <div id="title" className="flex justify-between items-center p-3 font-semibold text-blue-700 border-b">
                            <div id="left" className="">
                                <p>Activity</p>
                            </div>
                            <div id="right" className="text-gray-500 flex gap-3 items-center">
                                <MdSearch  className="w-5" />
                                <MdFilterList className="w-5" />
                            </div>
                        </div>
                        <div id="content" className="px-5 py-3 bg-[#F3F6FD] overflow-y-auto h-[500px]">
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                            <ActivityCell />
                        </div>
                    </div>
                    <div id="right-menu" className="">
                        <div className="flex flex-col items-center border-b">
                            <Menu props={{
                                title: "Activity",
                                isActive: true
                            }} />
                            <Menu props={{
                                title: "Condition",
                                isActive: false
                            }} />
                            <Menu props={{
                                title: "QA",
                                isActive: false
                            }} />
                            <Menu props={{
                                title: "Meeting",
                                isActive: false
                            }} />
                            <Menu props={{
                                title: "Docs",
                                isActive: false
                            }} />
                        </div>
                        <div className="flex justify-center items-center p-3">
                            <MdAdd className="w-8 h-8 text-gray-500" />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail;