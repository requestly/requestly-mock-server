import Handlebars from "handlebars";

import { MockContextParams, MockServerResponse, RequestMethod } from "../../types";
import { Mock, Response } from "../../types/mock";
import pathMatcher from "../utils/pathMatcher";
import { renderTemplate } from "../utils/templating";

class MockProcessor {
    mockContextParams!: MockContextParams
    mockData: Mock;
    endpoint: string;
    method: RequestMethod;
    
    constructor(mockData: Mock, endpoint: string, method: RequestMethod) {
        this.mockData = mockData;
        this.endpoint = endpoint;
        this.method = method;

        this.mockContextParams = this.prepareMockContextParams(mockData, endpoint, method);
    }
    
    prepareMockContextParams = (mockData: Mock, endpoint: string, method: RequestMethod): MockContextParams => {
        const params: MockContextParams = {
            urlParams: pathMatcher(mockData.endpoint, endpoint).params || {},
            method: method,
            statusCode: 200,
        }

        return params;
    }

    process = async (): Promise<MockServerResponse> => {
        const responseTemplate: Response = this.selectResponseTemplate();
        
        // Update statusCode as it depends on the selected responseTemplate
        this.mockContextParams.statusCode = responseTemplate.statusCode;
        
        return this.renderResponse(responseTemplate); 
    }

    selectResponseTemplate = (): Response => {
        // TODO: Right now we select only first response.
        // In future this needs to be selected on the basis of rules
         return this.mockData.responses[0]
    }

    renderResponse = async (responseTemplate: Response): Promise<MockServerResponse> => {
        const mockServerResponse: MockServerResponse = {
            statusCode: this.renderStatusCode(responseTemplate),
            headers: this.renderHeaders(responseTemplate),
            body: this.renderBody(responseTemplate),
        };

        await this.addDelay(responseTemplate.latency);
        return mockServerResponse;
    }

    renderStatusCode = (responseTemplate: Response) => {
        return responseTemplate.statusCode;
    }

    // TODO: Pass extra params here required for rendering
    // TODO: Do rendering of header here
    renderHeaders = (responseTemplate: Response) => {
        const headers: any = {};
        Object.keys(responseTemplate.headers).map(key => {
            headers[key] = responseTemplate.headers[key];
        })
        return headers;
    }
    
    // TODO: Pass extra params here required for rendering
    // TODO: Do template rendering here
    renderBody = (responseTemplate: Response) => {
        let bodyTemplate: string = responseTemplate.body;
        return renderTemplate(bodyTemplate, this.mockContextParams);
    }

    // Time in ms
    // TODO: Write logic for delay here
    addDelay = async (delay: number = 0) => {
        console.debug(`[Debug] Adding delay of ${delay}`);
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}

export default MockProcessor;
