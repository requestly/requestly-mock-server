import IConfigFetcher from "../interfaces/configFetcherInterface";
import { MockServerResponse, RequestMethod } from "../types";
import MockProcessor from "./mockProcessor";
import MockSelector from "./mockSelector";

export const handleMockEndpoint = async (req: any): Promise<MockServerResponse> => {
    const endpoint = req.path.slice(1);
    const method  = req.method as RequestMethod;
    
    const mockData = MockSelector.selectMock(endpoint, method);

    if(mockData) {
        console.debug("[Debug] Mock Selected", mockData);
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
