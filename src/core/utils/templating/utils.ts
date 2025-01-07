/**
 * if match is a string like {{unknownHelper arg1 arg2}}
 * it will add `\\` to its prefix, signaling handlebars should ignore it
 * 
 * https://handlebarsjs.com/guide/expressions.html#escaping-handlebars-expressions
 */
function escapeMatchFromHandlebars(match: string) {
    return match.replace(/({{)/g, '\\$1');
}

export function wrapUnexpectedTemplateCaptures(template: string, allHelpers: Record<string, unknown>) {
    const helperNames = Object.keys(allHelpers);
    
    return template.replace(/{{\s*([\s\S]*?)\s*}}/g, (completeMatch, firstMatchedGroup) => {
        const isMatchEmpty = firstMatchedGroup.trim() === '';
        if (isMatchEmpty) return escapeMatchFromHandlebars(completeMatch);

        const [helperName, ...args] = firstMatchedGroup.trim().split(/\s+/);

        // Check if it starts with a known helper
        const matchStartsWithKnownHelper = helperNames.some(name => helperName === name);
        if (!matchStartsWithKnownHelper) {
            return escapeMatchFromHandlebars(completeMatch);
        }

        // Get helper function and its required parameters
        const helperFunction = allHelpers[helperName] as Function;
        const requiredParams = helperFunction.length;

        // Escape if not enough arguments provided
        if (args.length < requiredParams) {
            return escapeMatchFromHandlebars(completeMatch);
        }

        // Wrap unquoted arguments in quotes
        if (args.length > 0) {
            const wrappedArgs = args.map((arg:any) => {
                return /^['"].*['"]$/.test(arg) ? arg : `"${arg}"`;
            });
            return `{{${helperName} ${wrappedArgs.join(' ')}}}`;
        }

        return completeMatch;
    });
}