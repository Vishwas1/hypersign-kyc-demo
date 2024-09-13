import { KYCServiceAccess, SSIServiceAccess, ServicesTypes  } from "./serviceLogin";
import { READ_WRITE_KEYS,  } from './utils'
import { MyOrgDID } from "./did";
import express, { Request, Response } from 'express';
import { ProductConfig } from "./config";
import { Routes } from './routes'
import { MyKyc } from './kyc'

function validateEnv(): boolean{
    if(!ProductConfig.KYC_SECRET_KEY){
        throw new Error('KYC_SECRET_KEY is not set in environment');
    }

    if(!ProductConfig.KYC_TENANT_URL){
        throw new Error('KYC_TENANT_URL is not set in environment');
    }

    if(!ProductConfig.SSI_TENANT_URL){
        throw new Error('SSI_TENANT_URL is not set in environment');
    }

    if(!ProductConfig.SSI_SECRET_KEY){
        throw new Error('SSI_SECRET_KEY is not set in environment');
    }

    return true
}

export async function setup() {
    validateEnv()
    
    // const ssiserviceAccess = new SSIServiceAccess()
    // await ssiserviceAccess.initialize();

    const kycServiceAccess = new KYCServiceAccess()
    await kycServiceAccess.initialize()
    
    // Creating Issuer DID
    // This step can be done from dashboard also
    // const mydid = new MyOrgDID(ssiserviceAccess.accessToken)
    // await mydid.createDid('myorg-issuer-2')
    // const res = await mydid.registerDid()

    // Pull session details from kyc
    const myKyc = new MyKyc(kycServiceAccess.accessToken)
    const allSessions = await myKyc.getSessions()
    console.log(allSessions)

    READ_WRITE_KEYS.getREADWRITEKeys().WRITE()
}

function server() {
    // setup()
    const app = express()
    const port = ProductConfig.PORT || 5001;
    app.use(express.static("public"));
    app.use(express.json())
    Routes(app)

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })

}

server()
