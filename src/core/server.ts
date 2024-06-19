import express, { Request, Response, Express } from "express";
import cors from "cors";

import MockServerHandler from "./common/mockHandler";
import IConfigFetcher from "../interfaces/configFetcherInterface";
import storageService from "../services/storageService";
import { MockServerResponse } from "../types";
import { cleanupPath } from "./utils";

interface MockServerConfig {
    port: number;
    pathPrefix: string;
}

class MockServer {
    config: MockServerConfig;
    configFetcher: IConfigFetcher;
    app: Express

    constructor (port: number = 3000, configFetcher: IConfigFetcher, pathPrefix: string = "") {
        this.config = {
            port,
            pathPrefix
        };
        this.configFetcher = configFetcher;

        this.app = this.setup();
    }

    start = () => {
        this.app.listen(this.config.port, () => {
            console.log(`Mock Server Listening on port ${this.config.port}`);
        })
    }

    setup = (): Express => {
        this.initStorageService();

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
        const regex = new RegExp(`${this.config.pathPrefix}\/(.+)`);
        app.all(regex, async (req: Request, res: Response) => {
            console.log(`Initial Request`);
            console.log(`Path: ${req.path}`);
            console.log(`Query Params: ${JSON.stringify(req.query)}`);
    
            // Stripping URL prefix
            if(req.path.indexOf(this.config.pathPrefix) === 0) {
                console.log(`Stripping pathPrefix: ${this.config.pathPrefix}`);
                Object.defineProperty(req, 'path', {
                    value: cleanupPath(req.path.slice(this.config.pathPrefix.length)),
                    writable: true
                });
                console.log(`Path after stripping prefix and cleanup: ${req.path}`);
            }
    
            const mockResponse: MockServerResponse = await MockServerHandler.handleEndpoint(req);
            // console.debug("[Debug] Final Mock Response", mockResponse);
            return res.status(mockResponse.statusCode).set(mockResponse.headers).end(mockResponse.body);
        });
    
        return app;
    }

    initStorageService = () => {
        storageService.setConfigFetcher(this.configFetcher);
    }
}

export default MockServer;
