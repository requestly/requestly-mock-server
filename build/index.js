"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IConfigFetcher = exports.setupMockServer = exports.startMockServer = void 0;
const configFetcherInterface_1 = __importDefault(require("./interfaces/configFetcherInterface"));
exports.IConfigFetcher = configFetcherInterface_1.default;
const main_1 = require("./main");
Object.defineProperty(exports, "setupMockServer", { enumerable: true, get: function () { return main_1.setupMockServer; } });
Object.defineProperty(exports, "startMockServer", { enumerable: true, get: function () { return main_1.startMockServer; } });
