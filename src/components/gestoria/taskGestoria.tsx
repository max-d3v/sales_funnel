import { Draggable } from 'react-beautiful-dnd';
import { CgProfile } from "react-icons/cg";
import { LuDot } from "react-icons/lu";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TaskContextGestoria } from '../gestoria/boardGestoria';
import { useState, useEffect } from 'react';
import { ImSpinner8 } from "react-icons/im";
import { BsExclamationCircle } from "react-icons/bs";
import { BsExclamationCircleFill } from "react-icons/bs";

interface taskProps {
    task: {
        Id: number;
        CardCode: string;
        CustomerName: string;
        StartDate: string;
        OpportunityName: string;
        MaxLocalTotal: number;
        StageId: number;
        PredDate: string;
        firstName: string;
        lastName: string;
    }
    index: string;
}


export function TaskGestoria({task, index}: taskProps) {
    const [isInDrag, setIsInDrag] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [showAlterOwnerModal, setShowAlterOwnerModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const { selectedTasks, alterModalState, alterSelectedTask, alterCurrentOwner } = useContext(TaskContextGestoria);
    
    
    useEffect(() => {
        if (selectedTasks.includes(task.Id.toString())) {
            setIsInDrag( true );
        } 
        if (!selectedTasks.includes(task.Id.toString())) {
            setIsInDrag( false );
        }
    }, [selectedTasks])
    

    function handleOpenTask(task: taskProps["task"]) {
        navigate(`/opportunity/${task.Id}`)
    }

    const diffInDays = () => {
        const predDate = new Date(task.PredDate);
        const currentDate = new Date();
        const differenceInTime = predDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays
    }

    const handleChangeTaskOwner = () => {
        alterSelectedTask(task.Id.toString());
        alterCurrentOwner(task.firstName + " " + task.lastName);
        alterModalState();
    }

    const handleHighlightTask = () => {
        console.log('highlight task');
    }
    
    const formatedDate = new Date(task.PredDate).toLocaleDateString();
    const daysToDate = diffInDays();
    const dateColor =
    daysToDate > 5 ? "text-green-700" :
    daysToDate < 0 ? "text-red-700" :
    "text-yellow-600";
  
    const formatedPrice = task.MaxLocalTotal.toLocaleString('pt-BR');
  
    return (
        <>
        <Draggable draggableId={task.Id.toString()} key={task.Id} index={index}>
            {(provided: any, snapshot: any) => {
            return (
                <div className={` w-full h-auto px-2 scaleCustom py-2 rounded-md ${isInDrag ? "bg-slate-200" : "bg-white"} items-center flex flex-row border border-black shadow-custom-shadow`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isdragging={snapshot.isdragging}>
                    <div className='w-11/12'>
                    <h3 className='p-0 m-0'>{task.OpportunityName}</h3>
                    <p className='m-0 mr-2 text-sm'>{task.CustomerName}</p>  
                    <div className='flex items-center gap-2 mt-3'>
                        <div onClick={() => handleChangeTaskOwner()} className=' gap-1 whitespace-nowrap flex items-center customBorder rounded-md px-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-sm' >
                        <CgProfile /><p className='m-0' > {task.firstName} </p>
                        </div>
                        <div className='m-0 text-xs font-semibold flex gap-1 items-center' >
                           <p className='m-0' > R$ {formatedPrice} </p> <LuDot /> <span className={dateColor} > {formatedDate} </span> </div>
                        </div>
                        
                    </div>  
                    <div className='h-full flex flex-col justify-between ml-3'>
                        <div className="flex items-center justify-center p-1"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => handleHighlightTask()}   
                        >
                            <BsExclamationCircleFill size={22} className={` ${!isHovered ? "opacity-0 absolute " : "opacity-100 scale-105"} corDestaque  cursor-pointer transition-all duration-300 `} /> <BsExclamationCircle size={22} className={` ${isHovered ? "opacity-0 absolute" : "opacity-100"} corDestaque cursor-pointer transition-all duration:300 `} /> </div>
                        {isInDrag ? <ImSpinner8 className='animate-spin' size={22} /> : <FaCirclePlus onClick={() => handleOpenTask(task)} size={22} className=' hover:rotate-90 cursor-pointer transition-all duration-300 hover:scale-125 p-1  '  /> }  
                    </div>
                </div>
                )
            }}
        </Draggable>
        </>
    )
}
