import { Request } from "express";
import { MockServerResponse, RequestMethod } from "../../types";
import MockProcessor from "./mockProcessor";
import MockSelector from "./mockSelector";
import { getServerMockResponse } from "../utils/mockServerResponseHelper";
import { HttpStatusCode } from "../../enums/mockServerResponse";
import { RQ_PASSWORD } from "../../constants/queryParams";

class MockServerHandler {
    static handleEndpoint = async (req: Request): Promise<MockServerResponse> => {
        let endpoint = req.path;
        const method  = req.method as RequestMethod;
        const queryParams = req.query || {};

        endpoint = MockServerHandler.cleanupEndpoint(endpoint);

        const kwargs = {
            queryParams: queryParams
        }

        const mockData = await MockSelector.selectMock(endpoint, method, kwargs);

        if(mockData) {
            console.debug("[Debug] Mock Selected with data", mockData);
            const mockResponse: MockServerResponse = await MockProcessor.process(
                mockData, 
                { 
                    endpoint, 
                    method, 
                    password: queryParams[RQ_PASSWORD] as string 
                }
            );
            return mockResponse;
        }

        console.debug("[Debug] No Mock Selected");
        return getServerMockResponse(HttpStatusCode.NOT_FOUND);
    }

    static cleanupEndpoint = (endpoint: string): string => {
        // Stripping front slash. Eg: /users/123/ -> users/123/
        endpoint = endpoint.slice(1);

        // Stripping end slash. Eg: users/123/ -> users/123
        if(endpoint.slice(-1) === "/") {
            endpoint = endpoint.slice(0, -1);
        }

        return endpoint
    }
}

export default MockServerHandler;
