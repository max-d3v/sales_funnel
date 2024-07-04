import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
  });

new class DeployPortainer {
    constructor() {
        this.portainerUrl = 'https://167.114.128.102:9443/api';
        this.token = "";
        this.dockerAuth = "ew0KInVzZXJuYW1lIjogImNvcGFwZWwiLA0KInBhc3N3b3JkIjogImd1ZXJyZWlyb3NkYXBhdmkiLA0KImVtYWlsIjogImRvY2tlcmh1YkBjb3BhcGVsLmNvbS5iciIsDQoic2VydmVyYWRkcmVzcyI6ICJodHRwczovL2luZGV4LmRvY2tlci5pby92MS8iDQp9";
        
    
    }
}


const portainerLogin = () => {

}