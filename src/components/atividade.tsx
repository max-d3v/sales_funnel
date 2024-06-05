import { formatDate } from "../utils/helpers"; 

interface atividadeProps {
    keyNum: number;
    origem: string;
    dataContact: string;
    dataCreate: string;
    mensagem: string;
    vendedor: string;
    bg?: string;
}

export function Atividade( {keyNum, origem, dataContact, dataCreate, mensagem, vendedor, bg = "white"}: atividadeProps ) {
    var dataContatoF = formatDate(new Date(dataContact));
    var dataCreateF = formatDate(new Date(dataCreate));
    

    return (
        <div key={keyNum} className={`flex w-full gap-2  box-border bg-${bg}  rounded-md customBorder transition-all duration-500 `} >
            <p className="w-1/5 ml-4" >{origem}</p>
            <p className="w-1/5"> {dataContatoF} <span className="text-gray-500" > - ticket criado no dia: {dataCreateF} </span> </p>
            <p className="w-2/5">{mensagem}</p>
            <p className="w-1/5">{vendedor}</p>
        </div>
    )
}