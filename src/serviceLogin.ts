import { ProductConfig } from "./config";
import { REQUEST, GET_READ_WRITE_KEYS , READ_WRITE_KEYS} from "./utils";

export enum ServicesTypes {
    SSI_SERVICE = 'SSI',
    KYC_SERVICE = 'KYC',
}

interface IServiceAccess{
    accessToken: string;
    serviceType: ServicesTypes;
    initialize(): Promise<void>;
}

export class SSIServiceAccess implements IServiceAccess{
    accessToken: string;
    serviceType: ServicesTypes;
    keysInstance: READ_WRITE_KEYS
    constructor(){
        this.accessToken = ""
        this.serviceType = ServicesTypes.SSI_SERVICE;
        this.keysInstance = READ_WRITE_KEYS.getREADWRITEKeys()
        this.keysInstance.INIT()
    }

    async initialize(): Promise<void>{   
        if(!this.keysInstance.keys.ssiAccessToken){
            const url = ProductConfig.ENTITY_DEV_DASHBOARD_OAUTH_URL;
            const headers = {
                "x-api-secret-key": ProductConfig.SSI_SECRET_KEY,
                'accept': 'application/json'
            }
            const res = await REQUEST.POST({ url, headers})
            this.accessToken  =  res.access_token
            this.keysInstance.keys.ssiAccessToken = res.access_token
        } else {
            console.log('Token already exists no need for refres')
            this.accessToken  =  this.keysInstance.keys.ssiAccessToken
        }
    }
}


export class KYCServiceAccess implements IServiceAccess{
    accessToken: string;
    serviceType: ServicesTypes;
    keysInstance: READ_WRITE_KEYS
    constructor(){
        this.accessToken = ""
        this.serviceType = ServicesTypes.KYC_SERVICE;
        this.keysInstance = READ_WRITE_KEYS.getREADWRITEKeys()
        this.keysInstance.INIT()
    }

    async initialize(): Promise<void> {   
        if(!this.keysInstance.keys.kycAccessToken){
            const url = ProductConfig.ENTITY_DEV_DASHBOARD_OAUTH_URL;
            const headers = {
                "x-api-secret-key": ProductConfig.KYC_SECRET_KEY,
                'accept': 'application/json'
            }
            const res = await REQUEST.POST({ url, headers})
            this.accessToken  =  res.access_token
            this.keysInstance.keys.kycAccessToken = res.access_token
        } else {
            console.log('Token already exists no need for refres')
            this.accessToken  =  this.keysInstance.keys.kycAccessToken
        }
    }
}