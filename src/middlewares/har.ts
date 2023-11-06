import type { 
    Har, 
    Request as HarRequest, 
    Response as HarResponse,
    Header as HarHeader,
    Param,
} from "har-format";
import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";
import { NextFunction, Request, Response } from "express";
import storageService from "../services/storageService";
import { DeepPartial } from "../types/utils";
import { RequestMethod } from "../types";


const getHarHeaders = (headers: IncomingHttpHeaders | OutgoingHttpHeaders): HarHeader[] => {
    const harHeaders: HarHeader[] = [];

    for (const headerName in headers) {
        const headerValue = headers[headerName];
        // Header values can be string | string[] according to Node.js typings,
        // but HAR format requires a string, so we need to handle this.
        if (headerValue) {
            const value = Array.isArray(headerValue) ? headerValue.join('; ') : headerValue;
            harHeaders.push({ name: headerName, value: value.toString() });
        }
    }

    return harHeaders;
};

const getPostData = (req: Request): HarRequest['postData'] => {
    if ([RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH].includes(req.method as RequestMethod)) {
        const postData: any = {
            mimeType: req.get('Content-Type') || 'application/json',
            text: '',
            params: [],
        };

        // When the body is URL-encoded, the body should be converted into params
        if (postData.mimeType === 'application/x-www-form-urlencoded' && typeof req.body === 'object') {
            postData.params = Object.keys(req.body).map(key => ({
                name: key,
                value: req.body[key],
            }));
        } else if (req.body) {
            try {
                postData.text = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
            } catch (error) {
                postData.text = "";
            }
        }

        return postData;
    }
    return undefined;
}

const getHarRequestQueryString = (req: Request): HarRequest['queryString'] => {
    // req.query is any, which isn't ideal; we need to ensure it's an object with string values
    const queryObject: Request['query'] = req.query;
  
    // Convert the object into an array of name-value pairs
    const queryString: HarRequest['queryString'] = [];
  
    for (const [name, value] of Object.entries(queryObject)) {
      if (Array.isArray(value)) {
        // If the value is an array, add an entry for each value
        value.forEach(val => queryString.push({ name, value: val as string }));
      } else {
        // Otherwise, just add the name-value pair directly
        queryString.push({ name, value: value as string });
      }
    }
  
    return queryString;
}

const buildHarRequest = (req: Request): HarRequest => {
    return {
        method: req.method,
        url: req.url,
        httpVersion: req.httpVersion,
        cookies: [],
        headers: getHarHeaders(req.headers),
        queryString: getHarRequestQueryString(req),
        postData: getPostData(req),
        headersSize: -1,
        bodySize: -1,
    }
};

const buildHarResponse = (res: Response, metadata?: any): HarResponse => {
    const { body } = metadata;
    return {
        status: res.statusCode,
        statusText: res.statusMessage,
        httpVersion: res.req.httpVersion,
        cookies: [],
        headers: getHarHeaders(res.getHeaders()),
        content: {
            size: Buffer.byteLength(JSON.stringify(body)),
            mimeType: res.get('Content-Type') || 'application/json',
            text: JSON.stringify(body),
        },
        redirectURL: '',
        headersSize: -1,
        bodySize: -1,
    }
};


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