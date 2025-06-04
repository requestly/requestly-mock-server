/**
 * if match is a string like {{unknownHelper arg1 arg2}}
 * it will add `\\` to its prefix, signaling handlebars should ignore it
 *
 * https://handlebarsjs.com/guide/expressions.html#escaping-handlebars-expressions
 */
function escapeMatchFromHandlebars(match: string) {
  return match.replace(/({{)/g, "\\$1");
}

export function wrapUnexpectedTemplateCaptures(
  template: string,
  allHelpers: Record<string, unknown>
) {
  const helperNames = Object.keys(allHelpers);
  return template.replace(
    /{{\s*(\S+?)(?=\s|}})/g, // matches {{ helperName arg1 }} -> helperName
    (completeMatch, firstMatchedGroup) => {
      const matchContainsKnownHelper = helperNames.some((helperName) => {
        return firstMatchedGroup.trim() === helperName;
      });

      if (!matchContainsKnownHelper) {
        return escapeMatchFromHandlebars(completeMatch);
      } else {
        return completeMatch;
      }
    }
  );
}
