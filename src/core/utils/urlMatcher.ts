// @ts-ignore
import pathToRegexp from "path-to-regexp";

/**
 * Common method that gets called
 * - selecting mock
 * - processing mock to find out path params
 * @param pattern Pattern To match (endpoint defined while creating mock)
 * @param url Actual Url that got hit
 * @return If pattern matches the url, then return the variables as kwargs, else return null
 */
const urlMatcher = (pattern: string, url: string): any => {
    const result: any = {
        success: false,
        params: {} // Populate this with variable from request url
    }
    
    let keys: any[] =[];
    const regexp = pathToRegexp(pattern, keys);
    console.log(`regexp: ${regexp}`);
    console.log("keys: ", keys);
    if(regexp.test(url)) {
        const matches = regexp.exec(url);
        console.log("MATCHED results: ", matches);
        result.params = convertMatchKeysToDict(keys, matches);
        result.success = true;
    }

    console.log("urlMatcher result: ", result);
    return result;
}

const convertMatchKeysToDict = (keys: any[] = [], result: any) => {
    const params: Record<string, string>= {};
    keys.map((key: Record<string, string>, i: number) => {
        console.log(key, i);
        params[key.name] = result[i+1];
        console.log(params);
    })
    return params;
}

export default urlMatcher;