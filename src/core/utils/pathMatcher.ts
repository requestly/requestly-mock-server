// @ts-ignore
import pathToRegexp from "path-to-regexp";

interface PathMatcherResult {
    success: boolean;
    params: Record<string, string>;
}

/**
 * Common method that gets called
 * - selecting mock
 * - processing mock to find out path params
 * @param pattern Pattern To match (endpoint defined while creating mock)
 * @param path Actual Url that got hit
 * @return If pattern matches the url, then return the variables as kwargs, else return null
 */
const pathMatcher = (pattern: string, path: string): PathMatcherResult => {
    const result: any = {
        success: false,
        params: {},
    }
    
    let keys: any[] =[];
    const regexp = pathToRegexp(pattern, keys);
    console.log(`regexp: ${regexp}`);
    console.log("keys: ", keys);

    if(regexp.test(path)) {
        const matches = regexp.exec(path);
        console.log("MATCHED results: ", matches);
        result.params = convertMatchKeysToDict(keys, matches);
        result.success = true;
    }

    console.log("pathMatcher result: ", result);
    return result;
}

/**
 * Uses the keys from pathToRegexp and regex results to create finalParams
 */
const convertMatchKeysToDict = (keys: any[] = [], result: any) => {
    const params: Record<string, string>= {};
    keys.map((key: Record<string, string>, i: number) => {
        params[key.name] = result[i+1];
    })
    return params;
}

export default pathMatcher;