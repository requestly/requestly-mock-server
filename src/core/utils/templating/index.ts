import { compile } from "handlebars";

import requestHelpers from "./helpers/requestHelpers";
import { MockContextParams } from "../../../types/internal";
import { wrapUnexpectedTemplateCaptures } from "./utils";


export const renderTemplate = (template: string, params: MockContextParams): string => {
    const allHelpers = {...requestHelpers(params)}
    const wrappedTemplate = wrapUnexpectedTemplateCaptures(template, allHelpers);
    const hbsTemplate = compile(wrappedTemplate);
    return hbsTemplate(params, {
        helpers: allHelpers
    });
};