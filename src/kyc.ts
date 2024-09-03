import { ProductConfig } from "./config";
import { REQUEST } from "./utils";

export class MyKyc {

    private accessToken: string;
    private sessionPath: string
    constructor(accessToken: string){
        this.accessToken = accessToken;
        this.sessionPath = '/e-kyc/verification/session/'
    }

    private getHeaders(){
        return {
            "authorization": 'Bearer ' + this.accessToken,
            "Content-Type": "application/json"
        }
    }

    async getSessions(): Promise<any> {
        const url = ProductConfig.KYC_TENANT_URL + this.sessionPath; 
        console.log(url)
        const headers = this.getHeaders()
        const resp = await REQUEST.GET({url, headers }); 
        return resp;
    }
}