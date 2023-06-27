import { compile } from "handlebars";

import { MockContextParams } from "../../../types";
import requestHelpers from "./helpers/requestHelpers";


export const renderTemplate = (template: string, params: MockContextParams): string => {
    const hbsTemplate = compile(template);
    return hbsTemplate(params, {
        helpers: {
            ...requestHelpers(params)
        }
    });
};
