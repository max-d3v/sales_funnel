import { formatDate } from "../utils/helpers"; 
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

interface atividadeProps {
    keyNum: number;
    numeroAtiv: string;
    assunto: string;
    dataContact: string;
    dataCreate: string;
    mensagem: string;
    vendedor: string;
    fechada: string;
    bg?: string;
    atribuidor: string;
    atribuido: string;
    nomeAtribuidor: string;
}

export function Atividade( {keyNum, fechada, numeroAtiv, dataContact, dataCreate, mensagem, vendedor, bg = "white", assunto, atribuidor, atribuido, nomeAtribuidor}: atividadeProps ) {
    var dataContatoF = formatDate(new Date(dataContact));
    var dataCreateF = formatDate(new Date(dataCreate));
    

    return (
        <div key={keyNum} className={`flex w-full gap-2  box-border bg-${bg}  rounded-md customBorder transition-all duration-500 `} >
            <p className="w-1/6 ml-4 flex items-center gap-4 m-0 p-0" >  {numeroAtiv} <span className="font-semibold text-lg " > {fechada == 'Y' ? <FaLock/> : <FaLockOpen/>} </span> </p>
            <p className="w-1/6"> {dataContatoF} <span className="text-gray-500" > - ticket criado no dia: {dataCreateF} </span> </p>
            <p className="w-1/6">{vendedor} {atribuido == atribuidor ?  null : <span> - Atribuído por {nomeAtribuidor} </span> } </p>
            <p className="w-2/6">{mensagem}</p>
            <p className="w-1/6">{assunto}</p> 
        </div>
    )
}