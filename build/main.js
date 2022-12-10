"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMockServer = exports.setupMockServer = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("./core");
const storageService_1 = __importDefault(require("./services/storageService"));
const setupMockServer = (configFetcher) => {
    initStorageService(configFetcher);
    const app = (0, express_1.default)();
    app.all(/\/(.+)/, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.path);
        const mockResponse = yield (0, core_1.handleMockEndpoint)(req);
        console.debug("[Debug] Final Mock Response", mockResponse);
        return res.status(mockResponse.statusCode).set(mockResponse.headers).end(mockResponse.body);
    }));
    return app;
};
exports.setupMockServer = setupMockServer;
const startMockServer = (configFetcher) => {
    const app = (0, exports.setupMockServer)(configFetcher);
    const port = 3000;
    app.listen(port, () => {
        console.log(`Mock Server Listening on port ${port}`);
    });
};
exports.startMockServer = startMockServer;
const initStorageService = (configFetcher) => {
    storageService_1.default.setConfigFetcher(configFetcher);
};
