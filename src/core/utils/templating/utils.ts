/**
 * if match is a string like {{unknownHelper arg1 arg2}}
 * it will add `\\` to its prefix, signaling handlebars should ignore it
 *
 * https://handlebarsjs.com/guide/expressions.html#escaping-handlebars-expressions
 */
function escapeMatchFromHandlebars(match: string) {
  return match.replace(/({{)/g, "\\$1");
}

/**
 * Creates regex to match pattern: "helperName 'parameter'"
 */
function getRegexByHelperName(helperName: string) {
  return new RegExp(`${helperName}\\b\\s+['"][^'"]*['"]`, "g");
}

function isMatchesHelperName(helperName: string, templateString: string) {
  const regex = getRegexByHelperName(helperName);
  return regex.test(templateString);
}

export function wrapUnexpectedTemplateCaptures(
  template: string,
  allHelpers: Record<string, unknown>
) {
  const helperNames = Object.keys(allHelpers);
  return template.replace(
    /{{\s*([\s\S]*?)\s*}}/g,
    (completeMatch, firstMatchedGroup) => {
      const isMatchEmpty = firstMatchedGroup.trim() === ""; // {{}}
      const matchContainsKnownHelper = helperNames.some((helperName) => {
        return isMatchesHelperName(helperName, firstMatchedGroup);
      });

      if (isMatchEmpty || !matchContainsKnownHelper) {
        return escapeMatchFromHandlebars(completeMatch);
      } else {
        return completeMatch;
      }
    }
  );
}
