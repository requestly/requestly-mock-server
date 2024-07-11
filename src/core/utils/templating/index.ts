import { compile } from "handlebars";

import requestHelpers from "./helpers/requestHelpers";
import { MockContextParams } from "../../../types/internal";
import { sanatizationHelpers, wrapUnexpectedTemplateCaptures } from "./helpers/sanitizationHelpers";


export const renderTemplate = (template: string, params: MockContextParams): string => {
    const wrappedTemplate = wrapUnexpectedTemplateCaptures(template);
    const hbsTemplate = compile(wrappedTemplate);
    return hbsTemplate(params, {
        helpers: {
            ...requestHelpers(params),
            ...sanatizationHelpers(),
        }
    });
};