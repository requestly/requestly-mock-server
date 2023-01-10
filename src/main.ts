import express from "express";
import cors from "cors";

import { handleMockEndpoint } from "./core";
import IConfigFetcher from "./interfaces/configFetcherInterface";
import storageService from "./services/storageService";
import { MockServerResponse } from "./types";

export const setupMockServer = (configFetcher: IConfigFetcher, pathPrefix = ""): any => {
    initStorageService(configFetcher);

    const app = express();

    app.use(cors({
        origin: true,
        exposedHeaders: "*",
        credentials: true,
        preflightContinue: true,
        optionsSuccessStatus: 200,
    }));

    app.use((_, res, next) => {
        res.set({
            "cache-control": "no-store",
            "X-Robots-Tag": "noindex",
        });
        next();
    });

    // ends the options requests without sending anything
    const optionsRegex = new RegExp(`${pathPrefix}\/(.+)`);
    app.options(optionsRegex, (_, res) => {
        res.end();
    });

    // pathPrefix to handle /mockv2 prefix in cloud functions
    const regex = new RegExp(`${pathPrefix}\/(.+)`);
    app.all(regex, async (req, res) => {
        console.log(req.path);
        console.log(req.query);
        const mockResponse: MockServerResponse = await handleMockEndpoint(req, pathPrefix);
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