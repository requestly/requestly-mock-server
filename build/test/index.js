"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const firebaseConfigFetcher_1 = __importDefault(require("./firebaseConfigFetcher"));
(0, __1.startMockServer)(firebaseConfigFetcher_1.default);
