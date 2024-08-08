import TaskDetail from "@/components/modals/task/taskDetail";
import { useData } from "@/components/contexts/dataContext";
import { useUser } from "@/components/contexts/userContext";
import DeleteTask from "@/lib/deleteTask";
import GetBoards from "@/lib/getBoards";
import UpdateTask from "@/lib/updateTask";
import moment from "moment";
import { useEffect, useState } from "react";
import { Draggable } from "react-drag-and-drop";
import { FaFlag,FaPencilAlt,FaPlus } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { LuDiamond } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";
const TaskCard = ({ task,setTasks }) => {
    const { flags,setBoards } = useData();
    const { user } = useUser();
    const textColors = ['#F38744', '#6941C6', '#067647'];

    const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
    const openDetails = () => {
        setIsTaskDetailOpen(true);
    }

    const closeDetail = () => {
        setIsTaskDetailOpen(false);
    }

    const deleteTask= async()=>{
        const bak = await DeleteTask(task.code, user.token);
        setTasks((prev)=>prev.filter((item)=>item.code !== task.code))
    }

    const props = {
        closeDetail,
        isTaskDetailOpen,
        task,
        flags
    }

    const [edit,setEdit]=useState(true)

    const [edTask, setEdTask] = useState(task);
    const [newTask, setNewTask] = useState(task);

    useEffect(()=>{
        setNewTask(task) 
    },[task])

    const updateTask = async () => {
        const bak = await UpdateTask(task.code,newTask, user.token);
        const data = await GetBoards(user.token)
        setBoards(data)
        setEdit(true)
        setEdTask(newTask)
    //     setNewTask({
    //      name: "",
    //      description: "",
    //      boardId: board.id,
    //      flagId: null,
    //      startDate: null,
    //      endDate: null
    //  })
     }

    return (
        <Draggable type="task" data={JSON.stringify(task)}>
            {edit ? 
             <div className="relative">
            <FaPencilAlt title="Edit" onClick={()=>setEdit(false)} color="yellow" className="w-7 h-7 absolute right-9 top-3 z-10 shadow-sm hover:bg-slate-100 rounded-lg p-1 mr-2" />
            <FiTrash2 title="Delete" onClick={deleteTask} color="red" className="w-7 h-7 absolute right-3 top-3 z-10 shadow-sm hover:bg-slate-100 rounded-lg p-1" />
            <div id="task" className="p-1 rounded-lg" onClick={() => openDetails()}>
                <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-100">
                    <div className="task-info flex gap-4 flex-col font-medium">
                        <p id="title" className={`text-[${newTask.code < 4 && textColors[newTask.code - 1].toString()}]`}>{newTask.name}</p>
                        <p className="description w-[320px] text-gray-700">{newTask.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consectetur voluptates id architecto facere eum dolore quaerat? Quaerat, nesciunt placeat."}</p>
                        <div className="date flex gap-1 text-gray-400 text-sm items-center">
                            <FaRegCalendarDays className="w-4 h-4" />
                            <p>{moment(newTask.startDate).format("DD.MM.YYYY") || "null"} - {moment(newTask.endDate).format("DD.MM.YYYY") || "null"}</p>
                        </div>
                        <div className="flag flex gap-1 text-gray-400 text-sm items-center">
                            <LuDiamond className="w-4 h-4" />
                            <p>Milestone Name</p>
                            <FaFlag color={flags[newTask?.flagId - 1]?.color}                         strokeWidth={5}
                            className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="task-people">

                    </div>
                </div>
                    
            </div>
            {isTaskDetailOpen && (
                    <TaskDetail props={props} />
                )}
            </div> : 
            <div className="flex justify-center items-center h-full min-w-[345px]">
                        
                            <div className="flex gap-5 flex-col justify-center items-center w-full h-full rounded-xl bg-[#F3F6FD] p-3 hover:border hover:border-white hover:shadow-xl">
                                <h6 className="text-xl font-medium font-josefin my-4 rounded-xl w-full text-center uppercase text-gray-500">Update task</h6>
                                <div id="add-new-task" className="flex gap-3 flex-col rounded-xl">
                                    <input type="text" name="" id="" placeholder="Enter name" value={newTask.name} className="p-2 rounded-lg border-none" onChange={(event) => setNewTask({ ...newTask, name: event.target.value })} />
                                    <input type="text" name="" id="" placeholder="Enter description" value={newTask.description} className="p-2 rounded-lg border-none" onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} />
                                    <label htmlFor="">Select a flag:</label>
                                    <div id="flag-checkboxes" className="flex justify-around w-2/3 py-3">
                                        <div title={flags[0].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 1 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="1" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[0].color} strokeWidth={5} className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[1].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 2 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="2" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[1].color} strokeWidth={5}className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[2].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 3 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="3" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[2].color} strokeWidth={5}className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[3].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 4 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="4" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[3].color} strokeWidth={5}className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                        <div title={flags[4].name} className={`flex justify-center items-center relative bg-gray-100 rounded-lg border border-gray-200 ${newTask.flagId == 5 ? "bg-orange-100" : ""}`}>
                                            <input type="radio" name="flag" id="" value="5" className="appearance-none w-7 h-7 bg-transparent rounded-lg z-10" onClick={(event:any) => setNewTask({ ...newTask, flagId: parseInt(event.target.value) })} />
                                            <FaFlag color={flags[4].color} strokeWidth={5}className="absolute inset-x-auto inset-y-auto z-0 w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex  justify-between flex-col">
                                        <div className="flex flex-col">
                                        <label htmlFor="">Start Date</label>
                                        <input type="date" name="" id="date" value={newTask.startDate != null && moment(newTask.startDate).format("YYYY-MM-DD")} className="p-2 rounded-lg border-none before:content-['Select']]" onChange={(event) => setNewTask({ ...newTask, startDate: event.target.value })} />
                                        </div>
                                        <div className="flex flex-col">
                                        <label htmlFor="">End Date</label>
                                        <input type="date" name="" id="date" value={newTask.endDate != null && moment(newTask.endDate).format("YYYY-MM-DD")} placeholder="Select end date" className=" p-2 rounded-lg border-none" onChange={(event) => setNewTask({ ...newTask, endDate: event.target.value })} />
                                        </div>
                                    </div>
                                    <span className="flex w-10 mx-auto justify-center items-center py-2 bg-orange-300 rounded-xl focus:bg-orange-500" onClick={updateTask} >
                                        <FaPencilAlt className="text-white " />
                                    </span>
                                </div>
                            </div>
                        
                    </div>}
           
            
        </Draggable>
    )
}

export default TaskCard;