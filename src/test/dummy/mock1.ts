import { RequestMethod } from "../../types";
import { Mock } from "../../types/mock";

export const dummyMock1: Mock = {
    id: "1",
    desc: "Mock 1",
    method: RequestMethod.GET,
    endpoint: "abcd/:userId/:name",
    responses: [
        {
            id: "1",
            desc: "Mock 1 Response 1",
            latency: 1000,
            statusCode: 404,
            headers:{
                "foo": "bar",
                "content-type": "application/json"
            },
            body: "{\"Hello\":\"There\",\"mockId\":\"1\"}"
        }
    ]
}

export const dummyMock2: Mock = {
    id: "2",
    desc: "Mock 2",
    method: RequestMethod.GET,
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
}

export const dummyMock3: Mock = {
    id: "3",
    desc: "Mock 3 : Password protected",
    method: RequestMethod.GET,
    endpoint: "users3",
    password: '1234',
    responses: [
        {
            id: "1",
            desc: "Mock 3 Response 1",
            latency: 0,
            statusCode: 200,
            headers: {
                "foo": "bar",
                "content-type": "application/json",
            },
            body: "{\"Hello\":\"There\",\"mockId\":\"3\"}"
        }
    ]
}

export const getSelectorMap = (): any => {
    let selectorMap: any = {}
    selectorMap[dummyMock1.id] = {
        method: dummyMock1.method,
        endpoint: dummyMock1.endpoint
    };

    selectorMap[dummyMock2.id] = {
        method: dummyMock2.method,
        endpoint: dummyMock2.endpoint
    };

    selectorMap[dummyMock3.id] = {
        method: dummyMock3.method,
        endpoint: dummyMock3.endpoint
    };

    return selectorMap;
}
