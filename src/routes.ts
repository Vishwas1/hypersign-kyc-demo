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
}
