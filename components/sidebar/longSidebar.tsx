"use client";

import BarChart from "@/assets/icons/sidebar/long/barChart";
import { useUser } from "../providers/userProvider";
import { useState } from "react";
import { FaChevronDown,FaRegCircle  } from "react-icons/fa";

const LongSidebar = () => {
    const { user } = useUser();

    // Ensure that user is defined
    const fullName = user?.fullName || "Guest";
    const email = user?.email || "Not available";
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="flex flex-col justify-between bg-white p-5 w-[282px]">
            <div className="top flex gap-3 flex-col">
                <p id="title">Projeler</p>
                {/* Dragable part */}
                <div className="project-accordion">
                    <ul>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <li>
                            <button className="flex gap-3 justify-between items-center w-full" onClick={() => handleClick(index)}>
                                <span className="text-5xl text-purple-500">·</span>
                                <p className="text-sm text-gray-700 text-nowrap">Proje İsim {index + 1}</p>
                                <span className="text-xl ms-20">
                                    <FaChevronDown className="text-gray-500 w-[20px]" />
                                </span>
                            </button>
                            <div  className={activeIndex === index ? "block menus" : "hidden menus"}>
                    <ul className="flex gap-5 flex-col">
                        <li className="flex justify-between items-center text-xs">
                            <p className="ms-10 text-gray-700">Overview</p>
                            <span className="bg-gray-100 rounded-2xl border border-gray-200 px-1.5 py-0.5">10</span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                            <p className="ms-10 text-gray-700">Notifications</p>
                            <span className="bg-gray-100 rounded-2xl border border-gray-200 px-1.5 py-0.5">10</span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                            <p className="ms-10 text-gray-700">Analytics</p>
                            <span className="bg-gray-100 rounded-2xl border border-gray-200 px-1.5 py-0.5">10</span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                            <p className="ms-10 text-gray-700">Reports</p>
                            <span className="bg-gray-100 rounded-2xl border border-gray-200 px-1.5 py-0.5">10</span>
                        </li>
                    </ul>
                </div>
                        </li>
                        ))}                        
                    </ul>
                </div>
                <div className="create-new flex gap-3 items-center text-sm text-gray-500 mt-5">
                    <BarChart />
                    <p>Proje Oluştur</p>
                </div>
            </div>
            <div className="bottom flex items-center justify-between py-2 gap-3">
                <div className="user-info">
                    <p id="full-name" className="font-semibold text-sm">{fullName}</p>
                    <p id="user-mail" className="text-xs text-gray-500">{email}</p>
                </div>
                <div className="active-dot">
                    <FaRegCircle className="w-[20px]" />
                </div>
            </div>
        </div>
    );
};

export default LongSidebar;
