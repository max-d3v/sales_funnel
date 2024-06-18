import { ReactNode } from "react";

interface GestorProps {
    children: ReactNode;
}

export function Gestor({children}: GestorProps): any {
    return children;
}