import { Draggable } from 'react-beautiful-dnd';
import { CgProfile } from "react-icons/cg";
import { LuDot } from "react-icons/lu";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TaskContextGestoria } from '../gestoria/boardGestoria';
import { useState, useEffect } from 'react';
import { ImSpinner8 } from "react-icons/im";



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
    }
    index: string;
}


export function TaskGestoria({task, index}: taskProps) {
    const [isInDrag, setIsInDrag] = useState<boolean>(false);
    const navigate = useNavigate();
    const { selectedTasks } = useContext(TaskContextGestoria);
    
    
    
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
          

    const formatedDate = new Date(task.PredDate).toLocaleDateString();
    const daysToDate = diffInDays();
    const dateColor =
    daysToDate > 5 ? "text-green-700" :
    daysToDate < 0 ? "text-red-700" :
    "text-yellow-600";
  

    const formatedPrice = task.MaxLocalTotal.toLocaleString('pt-BR');
    return (
        <Draggable draggableId={task.Id.toString()} key={task.Id} index={index}>
            {(provided: any, snapshot: any) => {
            return (
                <div className={` w-full h-auto px-2 scaleCustom py-2 rounded-md ${isInDrag ? "bg-slate-200" : "bg-white"} items-center flex flex-row border border-black shadow-custom-shadow`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isdragging={snapshot.isdragging}>
                    <div className='w-11/12'>
                    <h3 className='p-0 m-0'>{task.OpportunityName}</h3>
                    <p className='m-0 mr-2 text-sm'>{task.CustomerName}</p>  
                    <p className='m-0 text-xs font-semibold mt-3 flex gap-2 items-center'> <CgProfile /> R$ {formatedPrice} <LuDot /> <span className={dateColor} > {formatedDate} </span> </p>
                    </div>
                    {isInDrag ? <ImSpinner8 className='animate-spin' size={20} /> : <FaCirclePlus onClick={() => handleOpenTask(task)} size={22} className=' hover:rotate-90 cursor-pointer transition-all duration-300 hover:scale-125 p-1  '  /> }  
                </div>
                )
            }}
        </Draggable>
    )
}
