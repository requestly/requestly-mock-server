import type { Har } from "har-format";
import { NextFunction, Request, Response } from "express";
import storageService from "../services/storageService";
import { DeepPartial } from "../types/utils";
import { buildHarRequest, buildHarResponse } from "../core/utils/harFormatter";


export const HarMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    const requestStartTime = new Date();
    const requestStartTimeStamp: string = requestStartTime.toISOString();
    
    let responseBody: string;

    res.send = function (body) {
        responseBody = body;
        return originalSend.call(this, body);
    };

    res.once('finish', () => {
        const Har: DeepPartial<Har> = {
            log: {
                entries: [ 
                    {
                        time: Date.now() - requestStartTime.getTime(),
                        startedDateTime: requestStartTimeStamp,
                        request: buildHarRequest(req),
                        response: buildHarResponse(res, { body: responseBody }),
                    },
                ]
            }
        };

        storageService.storeLog({ mockId: res.locals.metadata.mockId, Har, })
    });

    next();
};