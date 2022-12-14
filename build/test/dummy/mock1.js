"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectorMap = exports.dummyMock2 = exports.dummyMock1 = void 0;
const types_1 = require("../../types");
exports.dummyMock1 = {
    id: "1",
    desc: "Mock 1",
    method: types_1.RequestMethod.GET,
    endpoint: "users",
    responses: [
        {
            id: "1",
            desc: "Mock 1 Response 1",
            latency: 1000,
            statusCode: 404,
            headers: {
                "foo": "bar",
                "content-type": "application/json"
            },
            body: "{\"Hello\":\"There\",\"mockId\":\"1\"}"
        }
    ]
};
exports.dummyMock2 = {
    id: "2",
    desc: "Mock 2",
    method: types_1.RequestMethod.POST,
    endpoint: "users2",
    responses: [
        {
            id: "1",
            desc: "Mock 2 Response 1",
            latency: 0,
            statusCode: 200,
            headers: {
                "foo": "bar",
                "content-type": "application/json"
            },
            body: "{\"Hello\":\"There\",\"mockId\":\"2\"}"
        }
    ]
};
const getSelectorMap = () => {
    let selectorMap = {};
    selectorMap[exports.dummyMock1.id] = {
        method: exports.dummyMock1.method,
        endpoint: exports.dummyMock1.endpoint
    };
    selectorMap[exports.dummyMock2.id] = {
        method: exports.dummyMock2.method,
        endpoint: exports.dummyMock2.endpoint
    };
    return selectorMap;
};
exports.getSelectorMap = getSelectorMap;
