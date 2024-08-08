import { LuCircleEllipsis } from "react-icons/lu";
import TaskCard from "./tasks/taskCard";
import { useEffect, useState } from "react";
import Empty from "@/assets/images/main/card/empty";
import { useData } from "../providers/dataProvider";
import createNewTask from "@/lib/createNewTask";
import getBoards from "@/lib/getBoards";
import { useUser } from "../providers/userProvider";
import { Droppable } from "react-drag-and-drop";
import UpdateTask from "@/lib/updateTask";
import { FaFlag,FaPlus  } from "react-icons/fa";
const BoardCard = ({ props }) => {
    const {
        board,
        selectBoard,
        changeFocusedBoard,
        updateBoards
    } = props;
    const { flags,boards,setBoards } = useData();
    const { user } = useUser();
const [empty,setEmpty]=useState(false)
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        boardId: board.id,
        flagId: null,
        startDate: null,
        endDate: null
    });
    const [updatedTask, setUpdatedTask] = useState(null);
const [tasks,setTasks]=useState(null)

    // console.log(board, tasks, flags)

    const saveNewTask = async () => {
       const bak = await createNewTask(newTask, user.token);
       const data = await getBoards(user.token)
       setTasks(data.find((item)=>item.id === bak.boardId)?.tasks)
       setEmpty(false)
       setNewTask({
        name: "",
        description: "",
        boardId: board.id,
        flagId: null,
        startDate: null,
        endDate: null
    })
    }

    const handleDrop = async (data) => {
        const task = JSON.parse(data.task);
        setUpdatedTask(task);
    }

    const updateArray = (array, newObj) => {
        // array.find((item)=>item.id === newObj.boardId).tasks
        const index= array.find((item)=>item.id === newObj.boardId).tasks.findIndex(item => item.code === newObj.code);
    let asd=[]
        if (index !== -1) {
            array.find((item)=>item.id === newObj.boardId).tasks.filter((item)=>item.code !== newObj.code)
        } else {
           array.find((item)=>item.id === newObj.boardId).tasks.push(newObj);
        }
    
        return array;
    };

    const updateArray1 = (array, newObj) => {
        const index = array.findIndex(item => item.code === newObj.code);
    
        if (index !== -1) {
            array.filter((item)=>item.code !== newObj.code)
        } else {
            array.push(newObj);
        }
    
        return array;
    };

    useEffect(() => {
        (async () => {
            if (updatedTask !== null) {
                const newData = { ...updatedTask, boardId: board.id }
                const bak = await UpdateTask(updatedTask.code, newData, user.token);
                const data = await getBoards(user.token)
                updateBoards(updatedTask.code, newData);
                setTasks((prev)=>prev?.filter((item)=>item.code !== newData.code) || null)
                setBoards(updateArray(data,newData))
                setUpdatedTask(null);
            };
        })()
        setTasks(board.tasks.length ? board.tasks : null)
    }, [updatedTask,board])
    return (
        <Droppable types={['task']} onDrop={handleDrop} className="rounded-2xl bg-white flex gap-1 flex-col max-h-2/4 w-fit m-1 border" onMouseEnter={() => {changeFocusedBoard(board.id) }}>
            <div className="title border-b flex justify-between items-center p-5">
                <div className="left-side flex gap-2 items-center">
                    <p className="uppercase ">{board.name}</p>
                    <span className="flex justify-center items-center text-sm font-semibold bg-blue-100 text-blue-500 rounded-full border border-blue-300 w-5 h-5">{tasks ? tasks.length : "0"}</span>
                </div>
                <div className="right-side flex gap-2 items-center">
                    <FaPlus title="New Task" className="text-gray-400" onClick={()=>setEmpty(!empty)} />
                    <LuCircleEllipsis className="text-gray-400" />
                </div>
            </div>
            <div id="card-[#F3F6FD" className="w-full h-full overflow-x-auto overflow-y-auto p-1">
                {tasks && tasks.map((task,index) => {
                    return (
                        <TaskCard setTasks={setTasks} task={task} key={index} />
                    )
                })}
                {(!tasks || empty) && (
                    <div className="flex items-start justify-center h-full w-[345px]">
                        {board.id == selectBoard && (
                            <div className="flex gap-5 flex-col justify-center items-center w-full rounded-xl bg-[#F3F6FD] p-3 hover:border hover:border-white hover:shadow-xl">
                                <h6 className="text-xl font-medium my-4 rounded-xl w-full text-center uppercase text-gray-500">Add new task</h6>
                                <div id="add-new-task" className="flex gap-3 flex-col rounded-xl">
                                    <input type="text" name="" id="" placeholder="Enter name" value={newTask.name} className="p-2 rounded-lg border-none" onChange={(event) => setNewTask({ ...newTask, name: event.target.value })} />
                                    <input type="text" name="" id="" placeholder="Enter description" value={newTask.description} className="p-2 rounded-lg border-none" onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} />
                                    <label className="" htmlFor="">Select a flag:</label>
                                    <div id="flag-checkboxes" className="flex justify-around w-2/3 py-3">
                                        <div title={flags[0].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 1 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="1" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[0].color} strokeWidth={5} className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[1].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 2 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="2" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[1].color} strokeWidth={5} className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[2].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 3 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="3" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[2].color} strokeWidth={5} className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[3].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 4 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="4" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[3].color} strokeWidth={5} className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[4].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 5 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="5" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[4].color} strokeWidth={5} className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex  justify-between flex-col">
                                        <div className="flex flex-col">
                                        <label htmlFor="">Start Date</label>
                                        <input type="date" name="" id="date" value={newTask.startDate != null && newTask.startDate} className="p-2 rounded-lg border-none before:content-['Select']]" onChange={(event) => setNewTask({ ...newTask, startDate: event.target.value })} />
                                        </div>
                                        <div className="flex flex-col">
                                        <label htmlFor="">End Date</label>
                                        <input type="date" name="" id="date" value={newTask.endDate != null && newTask.endDate} placeholder="Select end date" className=" p-2 rounded-lg border-none" onChange={(event) => setNewTask({ ...newTask, endDate: event.target.value })} />
                                        </div>
                                    </div>
                                    <button className="flex w-10 mx-auto justify-center items-center py-2 bg-blue-300 rounded-xl focus:bg-blue-500" onClick={saveNewTask}>
                                        <FaPlus className="text-white " />
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="my-auto">
                        {board.id != selectBoard && (
                            <Empty />
                        )}
                        </div>
                    </div>
                )}
            </div>
        </Droppable>
    )
}

export default BoardCard;