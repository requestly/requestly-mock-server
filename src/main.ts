import express, { Request, Response } from "express";
import cors from "cors";

import MockServerHandler from "./core";
import IConfigFetcher from "./interfaces/configFetcherInterface";
import storageService from "./services/storageService";
import { MockServerResponse } from "./types";

export const setupMockServer = (configFetcher: IConfigFetcher, pathPrefix = ""): any => {
    initStorageService(configFetcher);

    const app = express();

    app.use((_, res, next) => {
        res.set({
            "cache-control": "no-store",
            "X-Robots-Tag": "noindex",
        });
        next();
    });

    app.use(cors({
        origin: true,
        exposedHeaders: "*",
        methods: "*",
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
    }));

    // pathPrefix to handle /mockv2 prefix in cloud functions
    const regex = new RegExp(`${pathPrefix}\/(.+)`);
    app.all(regex, async (req: Request, res: Response) => {
        console.log(`Initial Request`);
        console.log(`Path: ${req.path}`);
        console.log(`Query Params: ${JSON.stringify(req.query)}`);

        // Stripping URL prefix
        if(req.path.indexOf(pathPrefix) === 0) {
            console.log(`Stripping pathPrefix: ${pathPrefix}`);
            Object.defineProperty(req, 'path', {
                value: req.path.slice(pathPrefix.length),
                writable: true
            });
            console.log(`Path after stripping prefix: ${req.path}`);
        }

        const mockResponse: MockServerResponse = await MockServerHandler.handleEndpoint(req);
        console.debug("[Debug] Final Mock Response", mockResponse);
        return res.status(mockResponse.statusCode).set(mockResponse.headers).end(mockResponse.body);
    });

    return app;
}


export const startMockServer = (configFetcher: IConfigFetcher) => {
    const app = setupMockServer(configFetcher, "");
    const port = 3000;
    app.listen(port, () => {
        console.log(`Mock Server Listening on port ${port}`);
    })
}

const initStorageService = (configFetcher: IConfigFetcher) => {
    storageService.setConfigFetcher(configFetcher);
}