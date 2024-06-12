import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { LoadingModal } from "../components/modalLoading";

interface PrivateProps {
    children: ReactNode;
}

export function Private({children}: PrivateProps): any {
    const { signed, loading, attAuthStatus } = useContext(AuthContext);
    const [authStatusChecked, setAuthStatusChecked] = useState(false);

    
    useEffect(() => {
        if (!signed) {
            attAuthStatus();
        }
        setAuthStatusChecked(true);
    }, []);

    if (loading || !authStatusChecked) {
        return  (
            <LoadingModal/>
        )
    }
    if (!loading && !signed) {
        console.log("Detectou mano não logado!");
        return;
      return <Navigate to="/login"/>;
    }

    return children;
}