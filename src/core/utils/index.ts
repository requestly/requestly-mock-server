export const cleanupPath = (path: string): string => {
  // Stripping front slash. Eg: /users/123/ -> users/123/
  path = path.slice(1);

  // Stripping end slash. Eg: users/123/ -> users/123
  if(path.slice(-1) === "/") {
      path = path.slice(0, -1);
  }

  return path
}