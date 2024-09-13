import express, { Request, Response } from 'express';
import { READ_WRITE_KEYS } from './utils';

export function Routes(app: express.Application){
    app.get('/', (req: Request, res: Response) => {
        res.sendFile('index.html');
    });

    app.get('/config', (req: Request, res: Response) => {
        res.json({
            kycAccessToken: READ_WRITE_KEYS.getREADWRITEKeys().keys.kycAccessToken,
            ssiAccessToken: READ_WRITE_KEYS.getREADWRITEKeys().keys.ssiAccessToken
        });
    });


    app.post('/kyc/hook', (req: Request, res: Response) => {

        console.log('---- Inside /kyc/hook ----- ')
        // console.log(req)
        console.log(req.headers)

        console.log(req.body)

        
        res.status(200)
    })
}
