import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ajax } from '../ajax/ajax';
import { LoadingModal } from '../components/modalLoading';
export function AutoLogin() {

    const location = useLocation();
    const navigate = useNavigate();
  

    const login = async (dataLogin: any) => {
        const response = await ajax({method: 'POST',endpoint: '/login', data: dataLogin});
        
        if (response.status == 'error') {
            navigate("/login");
            return;
        }

        if (response.status == 'success') {
            navigate('/');
            return;
        }
    }

    useEffect( () => {
        const searchParams = new URLSearchParams(location.search);
        const loginDataEncoded = searchParams.get('login');
        if (!loginDataEncoded) {
            console.error('Dados de login não fornecidos');
            return;
        }
        const loginData = atob(loginDataEncoded);

        const [username, password] = loginData.split('|');

        const dataLogin = { email: username, senha: password };
        login(dataLogin)
    }, [])


    return (
        <div className='h-full w-full flex flex-col items-center' >
            <h1>Realizando login automático</h1>
            <LoadingModal/>
        </div>
    )
}