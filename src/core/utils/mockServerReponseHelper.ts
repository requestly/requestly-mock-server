import { HttpStatusCode } from "../../enums/mockServerResponse";
import { MockServerResponse } from "../../types";

export const getServerMockResponse = (statusCode: HttpStatusCode): MockServerResponse => {
    switch(statusCode) {
        case HttpStatusCode.NOT_FOUND:
            return {
                statusCode,
                headers: {},
                body: "Mock Not Found",
            }    
        case HttpStatusCode.UNAUTHORIZED:
            return {
                statusCode,
                headers: {},
                body: "Unauthorized, please check if you have access to this route or pass a x-password header",
            }
    }
}