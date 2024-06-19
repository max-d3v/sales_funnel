import { ReactNode } from "react";
import SearchContext from "../components/layout";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
interface GestorProps {
    children: ReactNode;
}

export function Gestor({children}: GestorProps): any {
    const {isGestor} = useContext(SearchContext);
    const navigate = useNavigate();
    if (isGestor) {
        return children;
    }
    else {
        return navigate("/");
    }
}