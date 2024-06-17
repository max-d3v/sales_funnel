import { AuthContext } from "../context/authProvider"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { ajax } from "../ajax/ajax";
import { IoEnter } from "react-icons/io5";

export function ModalProfile() {
    const { user, signed } = useContext(AuthContext);
    const navigate = useNavigate();
    var name;
    if (signed) {
        name = user.name
    }

    const deleteAllCookies = () => {
        const cookies = document.cookie.split(";");
      
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }

    const deslogaUsuario = async () => {
        localStorage.clear();
        sessionStorage.clear();
        deleteAllCookies();
        const response = await ajax({method: "GET", endpoint: "/logout", data: null});
        console.log(response);
    }
    

    async function handleLogOut() {    
        await deslogaUsuario();

        navigate("/login");
    }
    
    return (
        <div className="flex-col gap-4 h-auto w-auto p-6 bg-white rounded-md shadow-2xl absolute flex items-center justify-center outline-0.5 right-3 z-50"> 
          <div className="flex items-center gap-2"> <CiUser />  <p className="m-0 font-semibold text-md">{signed ? name : "" }</p></div>
          <div className=" customBorder shadow-sm flex items-center justify-center gap-2 hover:text-black text-white bg-black cursor-pointer hover:bg-white p-2 rounded-md w-full hover:shadow-lg transiton-all duration-300" onClick={() => navigate("/gestoria")} > <IoEnter /> <p className="font-semibold m-0 " >Gestoria</p></div>
          <div className="flex items-center justify-center gap-2 cursor-pointer p-2 rounded-md bg-red-500 w-full hover:bg-red-800 hover:shadow-lg transiton-all duration-300" onClick={() => handleLogOut()}><CiLogout /><p className="text-white font-semibold m-0" >Sair</p></div>
        </div>
    )
}