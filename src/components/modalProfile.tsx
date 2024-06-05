import { AuthContext } from "../context/authProvider"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

export function ModalProfile() {
    const { user, signed } = useContext(AuthContext);
    const navigate = useNavigate();
    var name;
    if (signed) {
        name = user.name
    }
    

    async function handleLogOut() {    
        navigate("/login");
    }
    
    return (
        <div className="flex-col gap-4 h-auto w-auto p-6 bg-white rounded-md shadow-2xl absolute flex items-center justify-center outline-0.5 right-3 z-50"> 
          <div className="flex items-center gap-2"> <CiUser />  <p className="m-0 font-semibold text-md">{signed ? name : "" }</p></div>
          <div className="flex items-center justify-center gap-2 cursor-pointer p-2 rounded-md bg-red-500 w-full hover:bg-red-800 hover:shadow-lg transiton-all duration-300" onClick={() => handleLogOut()}><CiLogout /><p className="text-white font-semibold m-0" >Sair</p></div>
        </div>
    )
}