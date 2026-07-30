import type { Entry } from "har-format";
import { NextFunction, Request, Response } from "express";
import storageService from "../services/storageService";
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

    res.once('finish', async () => {
        try {
            const mockId = res.locals.rq_metadata?.mockId;
            // No matching mock (e.g. 404) means there's nothing to attach the log to.
            if (!mockId) {
                return;
            }

            const HarEntry: Partial<Entry> = {
                time: Date.now() - requestStartTime.getTime(),
                startedDateTime: requestStartTimeStamp,
                request: buildHarRequest(req),
                response: buildHarResponse(res, { body: responseBody }),
            }

            // Await so a rejected storeLog is caught here rather than surfacing
            // as an unhandled rejection.
            await storageService.storeLog({ mockId, HarEntry, })
        } catch (error) {
            // Never let a logging failure escape the finish handler — it would
            // surface as an uncaught exception and can crash the process.
            console.error("[HarMiddleware] Failed to store log", error);
        }
    });

    next();
};