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

        const kwargs = {
            queryParams: queryParams
        }

        const mockData = await MockSelector.selectMock(endpoint, method, kwargs);

        if(mockData) {
            // console.debug("[Debug] Mock Selected with data", mockData);
            const mockResponse: MockServerResponse = await MockProcessor.process(
                mockData, 
                req,
                queryParams[RQ_PASSWORD] as string,
            );
            return {
                ...mockResponse,
                metadata: { mockId: mockData.id },
            }
        }

        console.debug("[Debug] No Mock Selected");
        return getServerMockResponse(HttpStatusCode.NOT_FOUND);
    }
}

export default MockServerHandler;
