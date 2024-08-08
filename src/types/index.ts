import type { Entry } from "har-format";
import { HttpStatusCode } from "../enums/mockServerResponse";

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}

export enum Mode {
    FIREBASE =  "FIREBASE",
}

export interface MockServerResponse {
    body: string,
    statusCode: HttpStatusCode,
    headers: { [key: string]: string }
    metadata?: { mockId: string }
}

export interface Log {
    mockId: string;
    HarEntry: Partial<Entry>;
}