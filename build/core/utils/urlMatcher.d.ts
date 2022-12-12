/**
 * Common method that gets called
 * - selecting mock
 * - processing mock to find out path params
 * @param pattern Pattern To match (endpoint defined while creating mock)
 * @param url Actual Url that got hit
 * @return If pattern matches the url, then return the variables as kwargs, else return null
 */
declare const urlMatcher: (pattern: string, url: string) => any;
export default urlMatcher;
