import { Request } from "express";
import { HttpStatusCode } from "../../enums/mockServerResponse";
import { MockServerResponse, RequestMethod } from "../../types";
import { MockContextParams } from "../../types/internal";
import { Mock, MockMetadata, Response } from "../../types/mock";
import { validatePassword } from "../utils/mockProcessor";
import { getServerMockResponse } from "../utils/mockServerResponseHelper";
import pathMatcher from "../utils/pathMatcher";
import { renderTemplate } from "../utils/templating";

class MockProcessor {
  static process = async (
    mockData: Mock,
    request: Request,
    password?: string
  ): Promise<MockServerResponse> => {
    if (!validatePassword(mockData.password, password)) {
      return getServerMockResponse(HttpStatusCode.UNAUTHORIZED);
    }

    return this.renderMockServerResponse(mockData, request);
  };

  static renderMockServerResponse = async (
    mockData: Mock,
    request: Request,
  ): Promise<MockServerResponse> => {
    // TODO: Right now we select only first response.
    // In future this needs to be selected on the basis of rules
    const responseTemplate: Response = mockData.responses[0];

    const urlParams = pathMatcher(mockData.endpoint, request.path).params || {};
    const contextParams: MockContextParams = {
      method: request.method as RequestMethod,
      statusCode: responseTemplate.statusCode,
      urlParams,
      headers: request.headers as Record<string, string> || {},
    };
    
    console.log({ contextParams });

    const mockServerResponse: MockServerResponse = {
      statusCode: this.renderStatusCode(responseTemplate),
      headers: this.renderHeaders(responseTemplate),
      body: this.renderBody(responseTemplate, contextParams),
    };

    await this.addDelay(responseTemplate.latency);
    return mockServerResponse;
  };

  static renderStatusCode = (responseTemplate: Response) => {
    return responseTemplate.statusCode;
  };

  // TODO: Pass extra params here required for rendering
  // TODO: Do rendering of header here
  static renderHeaders = (responseTemplate: Response) => {
    const headers: any = {};
    Object.keys(responseTemplate.headers).map((key) => {
      headers[key] = responseTemplate.headers[key];
    });
    return headers;
  };

  // TODO: Pass extra params here required for rendering
  static renderBody = (
    responseTemplate: Response,
    mockContextParams: MockContextParams
  ) => {
    let finalBody = null;
    let bodyTemplate: string = responseTemplate.body;
    finalBody = renderTemplate(bodyTemplate, mockContextParams);
    return finalBody;
  };

  // Time in ms
  // TODO: Write logic for delay here
  static addDelay = async (delay: number = 0) => {
    console.debug(`[Debug] Adding delay of ${delay}`);
    return new Promise((resolve) => setTimeout(resolve, delay));
  };
}

export default MockProcessor;
