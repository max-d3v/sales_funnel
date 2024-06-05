import { GrnBtn } from "../greenBtn"
import { IoIosSave } from "react-icons/io";
import ReactQuill from 'react-quill';
import { useState } from "react";
import { task } from "../../pages/opportunity"
import { ajax } from "../../ajax/ajax";
import toast from 'react-hot-toast';

export function Notes({task}: {task?: task}) {
    const [quillValue, setquillValue] = useState<string | undefined>(task?.Remarks); 
    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}],
            ['bold', 'italic', 'underline'], 
            ['clean']
        ],
    }

    const handleSubmit = async () => {
        toast.dismiss();
        const response = await ajax({method: "PATCH", endpoint: "/task/atualizarNotas", data: {taskId: task?.SequentialNo, notas: quillValue}})
        if (!response) {
            toast.dismiss();
            toast.error("Erro ao salvar notas")
            return;
        }
        if (response.status == 'error') {
            toast.dismiss();
            toast.error(response.message)
            return;
        }

        if (response.status == 'success') {
            toast.dismiss();
            toast.success("Notas salvas com sucesso")
            return;
        }

        toast.dismiss();
        toast.error("Erro inesperado")
    }

    return (
        <div className="w-full h-full flex flex-col" >
            <div className="flex w-full justify-between mt-2" >
                <h1 className="m-0" >Anotações</h1>
                <GrnBtn onClick={ () => handleSubmit() } nomeBtn="salvar" icon={<IoIosSave size={20} />} />
            </div>
            <div className="flex w-full mt-6" >
                <ReactQuill theme="snow" value={quillValue} onChange={(value) => setquillValue(value)}  className={`myQuillBig text-xl border-none shadow-md`} modules={modules} />

            </div>
        </div>
    )
}