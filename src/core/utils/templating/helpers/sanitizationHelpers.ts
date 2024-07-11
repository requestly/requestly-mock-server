import { SafeString } from "handlebars"
import requestHelpers from "./requestHelpers";
import { RequestMethod } from "../../../../types";
import { MockContextParams } from "../../../../types/internal";

const DUMMY: MockContextParams = {
    urlParams: {},
    method: RequestMethod.GET,
    statusCode: 200,
    headers: {}
}

export function wrapUnexpectedTemplateCaptures(template: string) {
    const helperNames = Object.keys(requestHelpers(DUMMY))
    return template.replace(/{{\s*([\s\S]*?)\s*}}/g, (completeMatch, firstMatchedGroup) => {
        if (firstMatchedGroup === '') return '{{keepEmpty}}';

        const starttsWtihHelper = helperNames.some(helperName => firstMatchedGroup.startsWith(helperName));
        if(starttsWtihHelper) return completeMatch;

        const sanitizedMatch = firstMatchedGroup.replace(/(["])/g, '\\$1');     
        return `{{keepUnChanged "${sanitizedMatch}"}}`;
    });
}

export function sanatizationHelpers() {
    const helpers ={
        keepUnChanged: function(originalText: string) {
            return new SafeString('{{' + originalText + '}}');
        },
        keepEmpty: function() {
            return new SafeString('{{}}');
        }
    }

    return helpers
}