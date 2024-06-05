import {RegisterOptions, UseFormRegister} from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importe o estilo do editor
import { useState } from 'react';


interface textArea {
    register: UseFormRegister<any>;
    name: string;
    rules?: RegisterOptions;
    onChange?: any;
}


export function TextArea({register, name, rules}: textArea) {

    const [value, setValue] = useState('');
    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}],
            ['bold', 'italic', 'underline'], 
            ['clean']
        ],
    }

    return (
        <div className="relative mt-4  w-full box-border mb-4">
            <p className="m-0 font-semibold text-sm">Anotações</p>
            <ReactQuill theme="snow" value={value} onChange={setValue}  className={`myQuill w-12/12 border-none shadow-md `} modules={modules} />
            <input type="text" value={value} className='hidden' {...register(name, rules)}/>
        </div>
    )   
}