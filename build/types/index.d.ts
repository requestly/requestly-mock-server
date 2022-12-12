export declare enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}
export declare enum Mode {
    FIREBASE = "FIREBASE"
}
export interface MockServerResponse {
    body: string;
    statusCode: number;
    headers: {
        [key: string]: string;
    };
}
