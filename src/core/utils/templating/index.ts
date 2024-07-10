import { compile } from "handlebars";

import requestHelpers from "./helpers/requestHelpers";
import { MockContextParams } from "../../../types/internal";


export const renderTemplate = (template: string, params: MockContextParams): string => {
    const sanitizedTemplate = template.replace(/{{\s*}}/g, " ");
    const hbsTemplate = compile(sanitizedTemplate);
    return hbsTemplate(params, {
        helpers: {
            ...requestHelpers(params)
        }
    });
};