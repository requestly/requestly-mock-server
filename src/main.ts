import express from "express";
import { handleMockEndpoint } from "./core";
import MockSelector from "./core/mockSelector";
import IConfigFetcher from "./interfaces/configFetcherInterface";
import storageService from "./services/storageService";
import { MockServerResponse, Mode, RequestMethod } from "./types";

export const setupMockServer = (configFetcher: IConfigFetcher): any => {
    initStorageService(configFetcher);

    const app = express();
    app.all(/\/(.+)/, async (req, res) => {
        console.log(req.path);
        console.log(req.query);
        const mockResponse: MockServerResponse = await handleMockEndpoint(req);
        console.debug("[Debug] Final Mock Response", mockResponse);
        return res.status(mockResponse.statusCode).set(mockResponse.headers).end(mockResponse.body);
    });

    return app;
}


export const startMockServer = (configFetcher: IConfigFetcher) => {
    const app = setupMockServer(configFetcher);
    const port = 3000;
    app.listen(port, () => {
        console.log(`Mock Server Listening on port ${port}`);
    })
}

const initStorageService = (configFetcher: IConfigFetcher) => {
    storageService.setConfigFetcher(configFetcher);
}