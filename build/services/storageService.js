"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StorageService {
    constructor(configFetcher) {
        this.configFetcher = null;
        // TODO: This should be set when starting the mock server
        this.setConfigFetcher = (configFetcher) => {
            this.configFetcher = configFetcher;
        };
        this.getMockSelectorMap = (kwargs) => {
            var _a;
            return (_a = this.configFetcher) === null || _a === void 0 ? void 0 : _a.getMockSelectorMap(kwargs);
        };
        this.getMock = (id, kwargs) => {
            var _a;
            return (_a = this.configFetcher) === null || _a === void 0 ? void 0 : _a.getMock(id, kwargs);
        };
        this.configFetcher = configFetcher;
    }
}
const storageService = new StorageService();
exports.default = storageService;
