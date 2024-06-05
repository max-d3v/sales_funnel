import { useState, useEffect } from "react";
import { WhiteBtn } from "./whiteBtn";
import { IoIosCloseCircle } from "react-icons/io";
import { InputDados } from "./inputDados";
import { SelectDados } from "./selectDados";
import {useForm} from 'react-hook-form';
import { GrnBtn } from "./greenBtn";
import { IoIosSave } from "react-icons/io";
import { ajax } from "../ajax/ajax";
import toast, { Toaster } from "react-hot-toast";
interface novoTicketProps {
    onClose: () => void;
    CardCode?: string;
}


export function ModalNovoTicket( {onClose, CardCode}: novoTicketProps ) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const { register, handleSubmit } = useForm({});
    const [isFocused, setIsFocused] = useState(false);
    const [ticketState, setTicketState] = useState("resultadoExterno");
    const [renderToast, setRenderToast] = useState(false);

    const dataAtual = new Date();
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const horarioAtual = `${horas}:${minutos}`;

    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
    const dia = String(dataAtual.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
    const dataFormatada = `${dia}/${mes}/${ano}`;


    const onSubmit = async (data: any) => {
        setRenderToast(true);
        toast.dismiss();
        toast.loading("Enviando Ticket");
        data.cardcode = CardCode;
        const response = await ajax({method: "POST", endpoint: "/atividades/adicionar", data: data});
        if (!response) {
            toast.dismiss();
            toast.error("Erro ao enviar Ticket");
            return;
        }
        if (response.status == "error") {
            toast.dismiss();
            toast.error("Erro ao enviar Ticket");
            return;
        }
        if (response.status == 'success') {
            toast.dismiss();
            toast.success("Ticket enviado!");
            return;
        }

        toast.dismiss();
        toast.error("Erro ao enviar ticket")
    }

    const handleCanalState = (e: any) => {
        const value = e.target.value;
        if (value == "4")  {
            setTicketState("resultadoExterno");
            return;
        }
        if (value != "4") {
            setTicketState("resultado");
            return;
        }
        return;
    }



    
    
    //configs do funcionamento do modal
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } 
    if (!isOpen) {
        document.body.style.overflow = 'unset';
    }
    useEffect(() => {
        if (!isOpen) {
          onClose();
        }
    }, [isOpen, onClose]);

    
    return (
        <div className="modalAdd fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black overflow-auto z-50 flex items-center justify-center box-border">
            <form  id="formNovoTicket" action="" onSubmit={handleSubmit(onSubmit)} className="bg-white w-5/12 h-4/6    rounded-md flex flex-col box-border shadow-lg p-2">                
                <div className="flex justify-between px-4 items-center mt-2" >
                    <p className="m-0  text-xl font-semibold " >Novo Ticket</p>
                    <WhiteBtn nomeBtn="Fechar" onClick={() => setIsOpen(false)} icon={ <IoIosCloseCircle /> } />
                </div>
                <div className="horizontalRule" ></div>
                <div className="flex w-full px-4 gap-4 box-border " >
                    <div className=" flex flex-col w-1/2" >
                        <SelectDados requiredDefault={true} preValue="51" tipo={ticketState} placeholder="Resultado" name="resultado" register={register}   />
                        <SelectDados requiredDefault={true} preValue="4"  tipo="canal" placeholder="Canal" name="canal" register={register} funcaoAoMudar={handleCanalState} />
                    </div>
                    <div className="flex flex-col w-1/2" >
                        <InputDados editable={true} requiredDefault={true} preValue={dataFormatada} placeholder="Data" insidePlaceholder="29/01/2005" name="data" register={register} type="date" />
                        <InputDados editable={true} requiredDefault={true} preValue={horarioAtual} placeholder="Horário" insidePlaceholder="13:29" name="horario" register={register} type="time" />
                    </div>
                </div>
                <div className=" w-full px-4  mt-4 h-full box-border relative" >
                <textarea
                        required={true}
                        {...register("conteudo")}
                        name="conteudo"
                        id="conteudo"
                        placeholder=" "
                        className={`font-sans outline-none p-4 w-full h-full rounded-md customBorder box-border text-md focus:border-blue-500 ${isFocused ? 'pt-6' : ''}`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                        if (e.target.value === '') {
                            setIsFocused(false);
                        }
                        }}
                        
                    ></textarea>   
                <label
                    htmlFor="conteudo"
                    className={`absolute pl-4 left-4 transition-all duration-300 ${isFocused ? 'top-1 text-gray-600 text-sm' : 'top-4 text-md'}`}
                    >Conteúdo
                </label>
                </div>
                <div className="horizontalRule" ></div> 
                <div className="w-full px-4 mt-4 box-border flex justify-end mb-2" >
                    <GrnBtn form="formNovoTicket" icon={<IoIosSave size={20} />} nomeBtn="Adicionar Ticket" type="submit" />
                </div>
            </form>
                { renderToast ? <Toaster/> : null}
        </div>
        
    )
}