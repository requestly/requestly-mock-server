import { MockContextParams } from "../../../../types"

const requestHelpers = (params: MockContextParams) => {
    const helpers = {
        urlParam: (param: string) => params.urlParams[param],
        method: () => params.method,
        statusCode: () => params.statusCode,
    }
    return helpers;
}

export default requestHelpers;