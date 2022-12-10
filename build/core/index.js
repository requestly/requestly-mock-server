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
exports.handleMockEndpoint = void 0;
const mockProcessor_1 = __importDefault(require("./mockProcessor"));
const mockSelector_1 = __importDefault(require("./mockSelector"));
const handleMockEndpoint = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const endpoint = req.path.slice(1);
    const method = req.method;
    const mockData = mockSelector_1.default.selectMock(endpoint, method);
    if (mockData) {
        console.debug("[Debug] Mock Selected", mockData);
        const mockResponse = yield mockProcessor_1.default.process(mockData, endpoint, method);
        return mockResponse;
    }
    console.debug("[Debug] No Mock Selected");
    const notFoundResponse = {
        statusCode: 404,
        headers: {},
        body: "Mock Not Found",
    };
    return notFoundResponse;
});
exports.handleMockEndpoint = handleMockEndpoint;
