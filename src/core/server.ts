import express, { Request, Response, Express } from "express";
import cors from "cors";

import MockServerHandler from "./common/mockHandler";
import { IConfig } from "../interfaces/config";
import storageService from "../services/storageService";
import { MockServerResponse } from "../types";
import { HarMiddleware } from "../middlewares/har";
import { cleanupPath } from "./utils";

interface MockServerConfig {
    port: number;
    pathPrefix: string;
}

class MockServer {
    mockConfig: MockServerConfig;
    config: IConfig;
    app: Express

    constructor (config: IConfig, port: number = 3000, pathPrefix: string = "") {
        this.mockConfig = {
            port,
            pathPrefix
        };
        this.config = config;

        this.app = this.setup();
    }

    start = () => {
        this.app.listen(this.mockConfig.port, () => {
            console.log(`Mock Server Listening on port ${this.mockConfig.port}`);
        })
    }

    setup = (): Express => {
        this.initStorageService();

        const app = express();

        // Use middleware to parse `application/json` and `application/x-www-form-urlencoded` body data
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(HarMiddleware);
    
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
        const regex = new RegExp(`${this.mockConfig.pathPrefix}\/(.+)`);
        app.all(regex, async (req: Request, res: Response) => {
            console.log(`Initial Request`);
            console.log(`Path: ${req.path}`);
            console.log(`Query Params: ${JSON.stringify(req.query)}`);
    
            // Stripping URL prefix
            if(req.path.indexOf(this.mockConfig.pathPrefix) === 0) {
                console.log(`Stripping pathPrefix: ${this.mockConfig.pathPrefix}`);
                Object.defineProperty(req, 'path', {
                    value: cleanupPath(req.path.slice(this.mockConfig.pathPrefix.length)),
                    writable: true
                });
                console.log(`Path after stripping prefix and cleanup: ${req.path}`);
            }
    
            const mockResponse: MockServerResponse = await MockServerHandler.handleEndpoint(req);
            console.debug("[Debug] Final Mock Response", mockResponse);

            res.locals.rq_metadata = mockResponse.metadata;
            return res.status(mockResponse.statusCode).set(mockResponse.headers).send(mockResponse.body);
        });
    
        return app;
    }

    initStorageService = () => {
        storageService.setConfig(this.config);
    }
}

export default MockServer;
