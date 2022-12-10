"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Common method that gets called
 * - selecting mock
 * - processing mock to find out path params
 * @param pattern Pattern To match (endpoint defined while creating mock)
 * @param url Actual Url that got hit
 * @return If pattern matches the url, then return the variables as kwargs, else return null
 */
const urlMatcher = (pattern, url) => {
    const result = {
        success: false,
        params: {} // Populate this with variable from request url
    };
    // Right now we are doing only equality checks
    // TODO: Support regex, :param also
    if (pattern === url) {
        result.success = true;
    }
    return result;
};
exports.default = urlMatcher;
