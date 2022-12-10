import { MockServerResponse, RequestMethod } from "../types";
import MockProcessor from "./mockProcessor";
import MockSelector from "./mockSelector";

export const handleMockEndpoint = async (req: any): Promise<MockServerResponse> => {
    const endpoint = req.path.slice(1);
    const method  = req.method as RequestMethod;
    const queryParams = req.query || {};

    const kwargs = {
        queryParams: queryParams
    }

    const mockData = await MockSelector.selectMock(endpoint, method, kwargs);

    if(mockData) {
        console.debug("[Debug] Mock Selected with data", mockData);
        const mockResponse: MockServerResponse = await MockProcessor.process(mockData, endpoint, method)
        return mockResponse;
    }

    console.debug("[Debug] No Mock Selected");
    const notFoundResponse: MockServerResponse = {
        statusCode: 404,
        headers: {},
        body: "Mock Not Found",
    }
    return notFoundResponse;
}
