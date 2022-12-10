"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const firebaseConfigFetcher_1 = __importDefault(require("./firebaseConfigFetcher"));
(0, main_1.startMockServer)(firebaseConfigFetcher_1.default);
