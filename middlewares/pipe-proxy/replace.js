import pathToRegexp from 'path-to-regexp';
/**
 * Take in an express route-like path like "/foo/:bar", and an object of
 * parameters mapping to those path names, and return a string.
 *
 * replacePathParams('/:foo', {foo: 'beans'}) == '/beans'
 */
export default function replacePathParams(path, params) {
  let keys = [];
  // we don't care about the regexp, just extract the keys
  pathToRegexp(path, keys);
  keys.forEach((k) => {
    if (params[k.name]) {
      path = path.replace(`:${k.name}`, params[k.name]);
    }
  });
  return path;
}
