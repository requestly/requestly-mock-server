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
    statusCode: number,
    headers: { [key: string]: string }
}
