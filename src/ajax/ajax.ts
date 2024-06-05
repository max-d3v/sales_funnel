interface Request {
    method: string;
    endpoint: string;
    data: any;
    signal?: AbortSignal;
}

export async function ajax({ method, endpoint, data, signal }: Request) {
    //const url = 'http://localhost:8003/requests' + endpoint; //TEST
    const url = 'https://funilapi.copapel.com.br/requests' + endpoint; //PRODUCTION

    try {
        const options: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-requested-with': 'XMLHttpRequest',
            },
            credentials: "include",
            signal
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response: any = await fetch(url, options);
        const responseJson = await response.json();

        if (responseJson.message == 'Unauthorized') {
            if (endpoint === "/logout") {
                return;
            }
            return window.location.href = '/login';
        }

        return responseJson;
    } catch(err: any) {
        // Verificar se a falha ocorreu devido ao cancelamento da requisição
        if (err.name === 'AbortError') {
            console.log('Requisição cancelada');
            return; // Retornar sem fazer nada se a requisição foi cancelada
        }
        return { status: "error", message: err };
    }
}
