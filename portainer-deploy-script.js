import axios from 'axios';
import https from 'https';
const agent = new https.Agent({
    rejectUnauthorized: false
  });

new class DeployPortainer {
    constructor() {
        this.portainerUrl = process.env.PORTAINER_URL;
        this.dockerAuth = process.env.DOCKER_AUTH;
        this.token = "";
        this.Username = process.env.USERNAME
        this.Password = process.env.PASSWORD
        this.Imagem = process.env.NOME_IMAGEM
        this.NomeImagem = this.Imagem.split(":")[0];
        this.TagImagem = this.Imagem.split(":")[1];
        this.executaGitOps();
    }

    executaGitOps = async () => {
        await this.portainerLogin();
        await this.pullarImagemDockerHub();
        await this.pararContainerPorImagem();
        await this.deletarContainerParados();
        await this.criarContainer();
    }

    portainerLogin = async () => {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: this.portainerUrl + '/auth',
            headers: {
                'Content-Type': 'application/json', 
            },
            data: {
                Username: this.Username,
                Password: this.Password
            },
            httpsAgent: agent
        }
        try {
            const response = await axios(config);
            const token = response.data.jwt;
            this.token = token;    
        } catch(err) {
            throw new Error("Erro ao logar no Portainer")
        }
    }

    pullarImagemDockerHub = async () => {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: this.portainerUrl + '/endpoints/2/docker/images/create?fromImage=copapel/'+ this.Imagem +'',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${this.token}`,
                'X-Registry-Auth': this.dockerAuth
            },
            httpsAgent: agent
        }
        try {
            const response = await axios(config);
        } catch(err) {
            throw new Error("Erro ao puxar a imagem do Docker Hub")
        }
    }
    criarContainer = async () => {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: this.portainerUrl + '/endpoints/2/docker/containers/create',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${this.token}`,
            },
            data: {
                "name": "funil_vendas_frontend",
                "Image": "funil_vendas_frontend:latest",
                "ExposedPorts": { "80/tcp": {} },
                "HostConfig": { "PortBindings": { "8004/tcp": [{ "HostPort": "8004" }] }}
            },
            httpsAgent: agent
        }
        try {
            const response = await axios(config);
        } catch(err) {
            throw new Error("Erro ao criar o container")
        }
    }

    pararContainerPorImagem = async () => {
        try {
            const listContainersConfig = {
                method: "get",
                url: this.portainerUrl + '/endpoints/2/docker/containers/json?all=true',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
                httpsAgent: agent
            };
            const response = await axios(listContainersConfig);
            const containers = response.data;
            

            // Filtrar pelo nome da imagem

            console.log("Vai comparar o nome da imagem: " + containers[0].Names[0]);
            console.log("Com o nome da imagem: " + "/" + this.NomeImagem);
            
            const targetContainer = containers.find(container => container.Names[0] === "/" + this.NomeImagem);
    
            if (targetContainer) {
                console.log("Achou o container, vai parar o: ");
                console.log(targetContainer);

                const stopContainerConfig = {
                    method: "post",
                    url: this.portainerUrl + `/endpoints/2/docker/containers/${targetContainer.Id}/stop`,
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    },
                    httpsAgent: agent
                };
                await axios(stopContainerConfig);
                console.log(`Container ${targetContainer.Id} parado com sucesso.`);
            } else {
                console.log("Nenhum container rodando com a imagem especificada.");
            }
        } catch (error) {
            console.error("Erro ao parar o container:", error);
        }
    }

    deletarContainerParados = async () => {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: this.portainerUrl + '/endpoints/2/docker/containers/prune',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${this.token}`,
            },
            httpsAgent: agent
        }
        try {
            const response = await axios(config);
        } catch(err) {
            throw new Error("Erro ao deletar os containers parados")
        }
    }
}

