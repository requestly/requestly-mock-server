import { MockServerResponse, RequestMethod } from "../types";
import { Mock, Response } from "../types/mock";
import urlMatcher from "./utils/urlMatcher";

class MockProcessor {
    static process = async (mockData: Mock, endpoint: string, method: RequestMethod): Promise<MockServerResponse> => {
        const urlParams = urlMatcher(mockData.endpoint, endpoint).params || {}
        return this.renderMockServerResponse(mockData); 
    }

    static renderMockServerResponse = async (mockData: Mock): Promise<MockServerResponse> => {
        // TODO: Right now we select only first response.
        // In future this needs to be selected on the basis of rules
        const responseTemplate: Response = mockData.responses[0]
        
        const mockServerResponse: MockServerResponse = {
            statusCode: this.renderStatusCode(responseTemplate),
            headers: this.renderHeaders(responseTemplate),
            body: this.renderBody(responseTemplate),
        };

        await this.addDelay(responseTemplate.latency);
        return mockServerResponse;
    }

    static renderStatusCode = (responseTemplate: Response) => {
        return responseTemplate.statusCode;
    }

    // TODO: Pass extra params here required for rendering
    // TODO: Do rendering of header here
    static renderHeaders = (responseTemplate: Response) => {
        const headers: any = {};
        Object.keys(responseTemplate.headers).map(key => {
            headers[key] = responseTemplate.headers[key];
        })
        return headers;
    }
    
    // TODO: Pass extra params here required for rendering
    // TODO: Do template rendering here
    static renderBody = (responseTemplate: Response) => {
        let finalBody = null;
        finalBody = responseTemplate.body;
        return finalBody;
    }

    // Time in ms
    // TODO: Write logic for delay here
    static addDelay = async (delay: number = 0) => {
        console.debug(`[Debug] Adding delay of ${delay}`);
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}

export default MockProcessor;
