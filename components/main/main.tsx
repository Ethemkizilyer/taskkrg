"use client"

import BoardCard from "./boardCart"
import { useEffect, useRef, useState } from "react"
import { useData } from "../providers/dataProvider"
import { FaFilter } from "react-icons/fa"
import { BiLoaderCircle } from "react-icons/bi"
const Content = () => {
    const { flags, boards, setBoards } = useData();

    const [selectBoard, setSelectBoard] = useState(null)
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        scrollContainer.addEventListener("mousedown", handleMouseDown);
        scrollContainer.addEventListener("mouseleave", handleMouseLeave);
        scrollContainer.addEventListener("mouseup", handleMouseUp);
        scrollContainer.addEventListener("mousemove", handleMouseMove);

        return () => {
            scrollContainer.removeEventListener("mousedown", handleMouseDown);
            scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
            scrollContainer.removeEventListener("mouseup", handleMouseUp);
            scrollContainer.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isDragging, startX, scrollLeft]);

    useEffect(() => {
        setLoading(false);
    }, [boards]);

    const changeFocusedBoard = (boardId) => {
        setSelectBoard(boardId);
    }
    const updateBoards = (old, updated) => {
        const afterUpdateTheBoards = boards?.map((board) => {
            let tasks = board.tasks.filter((task) => task.code !== old);

            if (board.id === updated.boardId) {
                tasks = [...board.tasks, updated];
            };
            return { ...board, tasks: tasks };
        });
        setBoards(afterUpdateTheBoards);
    }

    return (
        <div className="p-5 flex gap-5 flex-col w-full h-full overflow-hidden">
            <div className="title flex justify-between">
                <p className="text-2xl text-[#145389]font-semibold">Frontend Case</p>
                <FaFilter />
            </div>
            <div id="categories">
                <ul className="bg-white flex gap-3 divide-x-2 rounded-lg border-2 border-gray-300 w-fit">
                    <li className="text-sm px-3 py-2"><button>Boards</button></li>
                    <li className="text-sm px-3 py-2"><button>List</button></li>
                    <li className="text-sm px-3 py-2"><button>Other</button></li>
                    <li className="text-sm px-3 py-2"><button>Other</button></li>
                    <li className="text-sm px-3 py-2"><button>Other</button></li>
                    <li className="text-sm px-3 py-2"><button>Other</button></li>
                    <li className="text-sm px-3 py-2"><button>Other</button></li>
                </ul>
            </div>
            <div  id="board"
            ref={scrollContainerRef} className={`cursor-pointer w-full h-full flex  overflow-x-auto ${loading && "justify-center items-center"}`}>
                {loading && (
                    <div>
                        <BiLoaderCircle className="w-24 h-24 text-gray-500 animate-spin" />
                    </div>
                )}
                {!loading && boards?.length != 0 && boards?.map((board) => {
                    const props = {
                        board,
                        selectBoard,
                        changeFocusedBoard,
                        updateBoards
                    }
                    return (
                        < BoardCard props={props} key={board.id} />
                    )
                })}
            </div>
        </div>
    )
}

export default Content;