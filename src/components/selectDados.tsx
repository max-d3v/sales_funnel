import {RegisterOptions, UseFormRegister} from 'react-hook-form';

interface input {
    placeholder: string;
    name: string;
    icon?: any;
    error?: string;
    rules?: RegisterOptions;
    insidePlaceholder?: string;
    preValue?: string;
    tipo?: string;
    register: UseFormRegister<any>;
    requiredDefault?: boolean;
    funcaoAoMudar?: (e: any) => void;
}
export function SelectDados({tipo, funcaoAoMudar, requiredDefault, preValue, register, placeholder, name, icon, error, rules}: input) {
    
    return (
        <div className="relative mt-4 ">
            <p className="m-0 font-semibold text-sm">{placeholder}</p>
            <div className="absolute ml-2 mt-3 flex items-center justify-center">{icon}</div>
            <div className='flex items-center'>
            <select {...(requiredDefault ? { required: true } : {})} {...funcaoAoMudar ? { ...register(name, { onChange: (e) => funcaoAoMudar(e) } ) } : { ...register(name, rules ) } }    className={` corPlaceholder text-black fontePadrao font-semibold colocarBorda w-full h-10 rounded-md border-none text-lg  ${icon ? 'pl-9' : 'pr-6 pl-2'} focus:outline-none focus:border-2`} >
                {
                    tipo == 'resultado' ? 
                    <>
                    <option selected={preValue == "51"} value="51">Pedido</option>
                    <option selected={preValue == "52"} value="52">Orçamento</option>
                    <option selected={preValue == "53"} value="53">Visita</option>
                    <option selected={preValue == "54"} value="54">Retonar</option>
                    <option selected={preValue == "55"} value="55">Estoque abastecido</option>
                    <option selected={preValue == "56"} value="56">Sem contato</option>
                    </>
                    : ""
                }
                {
                    tipo == 'resultadoExterno' ? 
                    <>
                    <option selected={preValue == "72"} value="72">Visita Realizada</option>
                    <option value="73">Reunião Realizada</option>
                    <option value="74">Diagnóstico Realizado</option>
                    <option value="79">Orçamento Realizado</option>
                    <option value="77">Pedir Visita</option>
                    <option value="20">Pedir Reunião</option>
                    </>
                    : ""
                }
                {
                    tipo == 'canal' ? 
                    <>
                    <option selected={preValue == "4"} value="4">Comercial Externo (presencial)</option>
                    <option selected={preValue == "7"} value="7">Telefonema</option>
                    <option selected={preValue == "6"} value="6">Whatsapp</option>
                    <option selected={preValue == "8"} value="8">E-mail</option>
                    </>
                    :
                    ""
                }
                
                { tipo == 'segmento' ? 
                <>
                <option selected={preValue == "102"} value="102">Academia</option>
                <option selected={preValue == "103"}value="103">Aliementos e Bebidas</option>
                <option selected={preValue == "104"}value="104">Condomínio</option>
                <option selected={preValue == "105"}value="105">Construção Civil</option>
                <option selected={preValue == "106"}value="106">Educação</option>
                <option selected={preValue == "107"}value="107">Entreterimento</option>
                <option selected={preValue == "108"}value="108">Facilities</option>
                <option selected={preValue == "109"}value="109">Food Service</option>
                <option selected={preValue == "110"}value="110">Hotelaria</option>
                <option selected={preValue == "111"}value="111">Indústria em Geral</option>
                <option selected={preValue == "112"}value="112">Inst. Financeiras</option>
                <option selected={preValue == "113"}value="113">Inst. Religiosa</option>
                <option selected={preValue == "114"}value="114">Lavandeira</option>
                <option selected={preValue == "115"}value="115">Outros</option>
                <option selected={preValue == "116"}value="116">Pessoa Física</option>
                <option selected={preValue == "117"}value="117">Revenda</option>
                <option selected={preValue == "118"}value="118">Saúde</option>
                <option selected={preValue == "119"}value="119">Setor Público</option>
                <option selected={preValue == "120"}value="120">Supermercado</option>
                <option selected={preValue == "121"}value="121">Transportes</option>
                <option selected={preValue == "122"}value="122">Varejo</option>                
                </>
                :
                ""
                }
                {
                    tipo == "pgto" ?
                <>
                <option value="CR_Boleto BRADE">Boleto Bradesco ( Clientes copapel )</option>
                <option value="CR_Boleto">Boleto ( Clientes Rejovel )</option>
                </>
                :
                ""
                }
            </select>
        
            </div>
           <p className='text-red-600 m-0 font-semibold text-sm'>{error ? error : ''}</p>
        </div>

        

)
}


