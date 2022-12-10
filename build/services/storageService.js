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
Object.defineProperty(exports, "__esModule", { value: true });
class StorageService {
    constructor(configFetcher) {
        this.configFetcher = null;
        // TODO: This should be set when starting the mock server
        this.setConfigFetcher = (configFetcher) => {
            this.configFetcher = configFetcher;
        };
        this.getMockSelectorMap = (kwargs) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.configFetcher) === null || _a === void 0 ? void 0 : _a.getMockSelectorMap(kwargs);
        });
        this.getMock = (id, kwargs) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            return (_b = this.configFetcher) === null || _b === void 0 ? void 0 : _b.getMock(id, kwargs);
        });
        this.configFetcher = configFetcher;
    }
}
const storageService = new StorageService();
exports.default = storageService;
