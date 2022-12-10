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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const storageService_1 = __importDefault(require("../services/storageService"));
const urlMatcher_1 = __importDefault(require("./utils/urlMatcher"));
class MockSelector {
}
_a = MockSelector;
// Selects and return the first mock which matches the current endpoint
MockSelector.selectMock = (endpoint, method, kwargs) => __awaiter(void 0, void 0, void 0, function* () {
    console.debug("[MockSelector]", endpoint, method, kwargs);
    const mockSelectorMap = (yield storageService_1.default.getMockSelectorMap(kwargs)) || {};
    let mockId = null;
    mockId = Object.keys(mockSelectorMap).find((elem) => {
        return _a.compareSelector(mockSelectorMap[elem], endpoint, method);
    });
    if (mockId) {
        console.debug(`[Debug][mockSelector] Mock Selected ${mockId}`);
        const mockData = yield storageService_1.default.getMock(mockId, kwargs);
        return mockData;
    }
    console.debug(`[Debug][mockSelector] No Mock Selected`);
    return null;
});
// Return whether the endpoint matches the selector for a mock or not
MockSelector.compareSelector = (selector, endpoint, method) => {
    const methodMatched = selector.method === method;
    const urlMatched = (0, urlMatcher_1.default)(selector.endpoint, endpoint).success || false;
    if (methodMatched && urlMatched) {
        return true;
    }
    return false;
};
exports.default = MockSelector;
