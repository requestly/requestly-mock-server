import { RequestMethod } from ".";

export interface MockContextParams {
  urlParams: Record<string, string>;
  method: RequestMethod;
  statusCode: number;
  headers: Record<string, string>;
}
