"use strict";
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
MockSelector.selectMock = (endpoint, method) => {
    console.log("MockSelector", endpoint, method);
    const mockSelectorMap = storageService_1.default.getMockSelectorMap() || {};
    let mockId = null;
    mockId = Object.keys(mockSelectorMap).find((elem) => {
        return _a.compareSelector(mockSelectorMap[elem], endpoint, method);
    });
    if (mockId) {
        const mockData = storageService_1.default.getMock(mockId);
        return mockData;
    }
    return null;
};
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
