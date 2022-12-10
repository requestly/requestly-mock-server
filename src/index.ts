import express from "express";
import { handleMockEndpoint } from "./core";
import MockSelector from "./core/mockSelector";
import IConfigFetcher from "./interfaces/configFetcherInterface";
import storageService from "./services/storageService";
import { MockServerResponse, Mode, RequestMethod } from "./types";

export const startMockServer = (configFetcher: IConfigFetcher) => {
    initStorageService(configFetcher);

    const app = express();
    const port = 3000;
    app.all(/\/(.+)/, async (req, res) => {
        console.log(req.path);
        const mockResponse: MockServerResponse = await handleMockEndpoint(req);
        console.debug("[Debug] Final Mock Response", mockResponse);
        return res.status(mockResponse.statusCode).set(mockResponse.headers).end(mockResponse.body);
    });
      
    app.listen(port, () => {
        console.log(`Mock Server Listening on port ${port}`);
    })
}

const initStorageService = (configFetcher: IConfigFetcher) => {
    storageService.setConfigFetcher(configFetcher);
}