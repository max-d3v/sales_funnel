import { ReactNode, createContext, useState } from "react";
import { ajax } from "../ajax/ajax";

interface AuthContextData {
    signed: boolean;
    user: any;
    loading: boolean;
    attAuthStatus: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);


    const attAuthStatus = async () => {
            setLoadingAuth(true);
            try {
                const response = await ajax({method: "GET", endpoint: "/authStatus", data: null})
                if (!response) {
                    setUser(null);
                    setLoadingAuth(false);
                    return;
                }
                if (response.status == "success") {
                    setUser(response.user);
                }
                if (response.status == "error") {
                    setUser(null);  
                }
                setLoadingAuth(false);
            }
            catch(err) {
                setUser(null);
                setLoadingAuth(false);
            }
            
        }

    return (
        <AuthContext.Provider
        value={{ signed: !!user, user: user, loading: loadingAuth, attAuthStatus}}
        >
            {children}  
        </AuthContext.Provider>
    )
}

export default AuthProvider;