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
const urlMatcher_1 = __importDefault(require("./utils/urlMatcher"));
class MockProcessor {
}
_a = MockProcessor;
MockProcessor.process = (mockData, endpoint, method) => __awaiter(void 0, void 0, void 0, function* () {
    const urlParams = (0, urlMatcher_1.default)(mockData.endpoint, endpoint).params || {};
    return _a.renderMockServerResponse(mockData);
});
MockProcessor.renderMockServerResponse = (mockData) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Right now we select only first response.
    // In future this needs to be selected on the basis of rules
    const responseTemplate = mockData.responses[0];
    const mockServerResponse = {
        statusCode: _a.renderStatusCode(responseTemplate),
        headers: _a.renderHeaders(responseTemplate),
        body: _a.renderBody(responseTemplate),
    };
    yield _a.addDelay(responseTemplate.latency);
    return mockServerResponse;
});
MockProcessor.renderStatusCode = (responseTemplate) => {
    return responseTemplate.statusCode;
};
// TODO: Pass extra params here required for rendering
// TODO: Do rendering of header here
MockProcessor.renderHeaders = (responseTemplate) => {
    const headers = {};
    Object.keys(responseTemplate.headers).map(key => {
        headers[key] = responseTemplate.headers[key];
    });
    return headers;
};
// TODO: Pass extra params here required for rendering
// TODO: Do template rendering here
MockProcessor.renderBody = (responseTemplate) => {
    let finalBody = null;
    finalBody = responseTemplate.body;
    return finalBody;
};
// Time in ms
// TODO: Write logic for delay here
MockProcessor.addDelay = (delay = 0) => __awaiter(void 0, void 0, void 0, function* () {
    console.debug(`[Debug] Adding delay of ${delay}`);
    return new Promise(resolve => setTimeout(resolve, delay));
});
exports.default = MockProcessor;
