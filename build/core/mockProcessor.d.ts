import { MockServerResponse, RequestMethod } from "../types";
import { Mock, Response } from "../types/mock";
declare class MockProcessor {
    static process: (mockData: Mock, endpoint: string, method: RequestMethod) => Promise<MockServerResponse>;
    static renderMockServerResponse: (mockData: Mock) => Promise<MockServerResponse>;
    static renderStatusCode: (responseTemplate: Response) => number;
    static renderHeaders: (responseTemplate: Response) => any;
    static renderBody: (responseTemplate: Response) => string;
    static addDelay: (delay?: number) => Promise<unknown>;
}
export default MockProcessor;
