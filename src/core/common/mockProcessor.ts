import { HttpStatusCode } from "../../enums/mockServerResponse";
import { MockServerResponse, RequestMethod } from "../../types";
import { Mock, MockMetadata, Response } from "../../types/mock";
import { getServerMockResponse } from "../utils/mockServerReponseHelper";
import pathMatcher from "../utils/pathMatcher";

class MockProcessor {
    static process = async (mockData: Mock, mockMetaData: Partial<MockMetadata>): Promise<MockServerResponse> => {
        const { endpoint, method, password } = mockMetaData;
        if(mockData.password) {
            if(!password || mockData.password !== password) {
                return getServerMockResponse(HttpStatusCode.UNAUTHORIZED);
            }
        }
        const urlParams = pathMatcher(mockData.endpoint, endpoint!).params || {}
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
