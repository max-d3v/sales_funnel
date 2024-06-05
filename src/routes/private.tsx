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
        const checkAuthStatus = async () => {
            if (!signed) {
                await attAuthStatus();
            }
            setAuthStatusChecked(true);
        };
        checkAuthStatus();
    }, [attAuthStatus, signed]);

    if (loading || !authStatusChecked) {
        return  (
            <LoadingModal/>
        )
    }
    if (!signed) {
      return <Navigate to="/login"/>;
    }

    return children;
}