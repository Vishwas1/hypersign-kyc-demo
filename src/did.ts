import { ProductConfig } from "./config";
import { REQUEST, READ_WRITE_KEYS } from "./utils";

export class MyOrgDID {
    createDIDPath: string; 
    registerDIDPath: string;
    accessToken: string;
    keysInstance: READ_WRITE_KEYS;
    didDocument: any;
    constructor(accessToken: string){
        this.createDIDPath = "/did/create";
        this.registerDIDPath = "/did/register";
        if(!accessToken){
            throw new Error("Access token is required")
        }
        this.accessToken = accessToken;
        this.keysInstance = READ_WRITE_KEYS.getREADWRITEKeys()
        this.didDocument  = {}
    }

    private getHeaders(){
        return {
            "authorization": 'Bearer ' + this.accessToken,
            "Content-Type": "application/json"
        }
    }

    async createDid(name: string = ''): Promise<any>{

        if(Object.keys(this.keysInstance.keys.issuerDIDDocument).length > 0){
            console.log('DID was already created')
            this.didDocument = this.keysInstance.keys.issuerDIDDocument
            return this.didDocument 
        } else {
            const url = ProductConfig.SSI_TENANT_URL + this.createDIDPath; 
            const headers = this.getHeaders()
            const body = {
                namespace: 'testnet',
                options: {
                    name
                }
            }
            const resp = await REQUEST.POST({url,  body, headers }); 
            this.didDocument = resp['metaData']['didDocument']
            this.keysInstance.keys.issuerDIDDocument = resp['metaData']['didDocument']
            return this.didDocument;
        }

       
    }

    async registerDid(didDocument: any = this.didDocument): Promise<any>{
        if(this.keysInstance.keys.didStatus != 'REGISTERED'){
            const url = ProductConfig.SSI_TENANT_URL + this.registerDIDPath; 
            const headers = this.getHeaders()
            const body = {
                didDocument,
                verificationMethodId: didDocument['verificationMethod'][0]['id']
            }
            await REQUEST.POST({url,  body, headers }); 
            this.keysInstance.keys.didStatus = 'REGISTERED'
            return this.keysInstance.keys.didStatus;
        } else {
            console.log('DID was already registered')
            return this.keysInstance.keys.didStatus
        }
        
    }
}