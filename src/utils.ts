import * as fs from 'fs';

interface REQUESTPARAM {
    url: string;
    headers?: any;
}

interface POSTREQUESTPARAM extends  REQUESTPARAM {
    body?: any;
}

export interface IKeys {
    ssiAccessToken: string;
    kycAccessToken: string;
    issuerDIDDocument: any;
    didStatus: string
}

// interface REQUEST_RESPONSE {
//     statusCode: number;
//     message: Array<string>;
//     error: string;
// }

export abstract class REQUEST {
    public  static async GET({url, headers}: REQUESTPARAM): Promise<any>{
        const t: { headers?: any, method: string } = {
            method: 'GET',
            headers
        }
        const resp = await fetch(url, t);
        const json = await resp.json();
        return json
    }

    public  static async POST({url, body, headers}: POSTREQUESTPARAM): Promise<any>{
        const t: { body?: any, headers?: any, method: string } = {
            method: 'POST'
        }

        if(headers){
            t['headers'] = headers
        }
        if(body) {
            t['body'] = JSON.stringify(body)
        }
        
        const resp = await fetch(url, t);    
        const json: any  = (await resp.json());

        console.log(json)
        if(json && json.error){
            throw new Error(json.message.toString())
        } 
       
        return json
    }
} 

abstract class READ_WRITE_KEYS_ABS {
    protected abstract filePath: string; 
    public abstract INIT(): IKeys;
    public abstract WRITE(json: IKeys): void;
}

export class READ_WRITE_KEYS extends READ_WRITE_KEYS_ABS {
    protected filePath: string = 'keys.json';
    public keys: IKeys;
    private static instance: READ_WRITE_KEYS

    private constructor(){
        super();
        this.keys = {
            "ssiAccessToken": "",
            "kycAccessToken": "",
            "issuerDIDDocument": {},
            "didStatus": "NOTSTARTED"
        }
        // this.WRITE()
    }

    public static getREADWRITEKeys(): READ_WRITE_KEYS{
        if(!READ_WRITE_KEYS.instance){
            READ_WRITE_KEYS.instance = new READ_WRITE_KEYS()
        }

        return READ_WRITE_KEYS.instance
    }

    public INIT(): IKeys {
        // Read the file synchronously
        const data = fs.readFileSync('keys.json', 'utf-8');
        this.keys = JSON.parse(data)  as IKeys
        // Parse JSON data
        return this.keys
    }


    public WRITE() {
        // Convert JavaScript object to JSON string
        const jsonString = JSON.stringify(this.keys, null, 2);        
        
        // Write the file synchronously
        fs.writeFileSync('keys.json', jsonString, 'utf-8');

        console.log("File successfully written!");   
    }
}

export function GET_READ_WRITE_KEYS(): READ_WRITE_KEYS {
    return READ_WRITE_KEYS.getREADWRITEKeys()
}