import { ReactNode } from "react";
import SearchContext from "../components/layout";
import { useContext } from "react";
interface GestorProps {
    children: ReactNode;
}

export function Gestor({children}: GestorProps): any {
    const {isGestor} = useContext(SearchContext);

    if (isGestor) {
        return children;
    }
    else {
        return "";
    }
}