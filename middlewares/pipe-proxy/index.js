import fetch from 'isomorphic-fetch';
import replacePathParams from './replace';

const hasColons = /:/;

export default function pixie(options) {
  return (path, encoding) => {
    const shouldReplacePathParams = hasColons.test(path);
    return async (ctx, next) => {
      let self = ctx;
      let urlPath = path || ctx.url;

      let requestOpts = {
        url: `${options.host}${urlPath}`,
        method: ctx.method,
        headers: ctx.headers,
        qs: ctx.query,
        encoding: encoding
      };

      // 替换，route中含有 /:foo的样式，则替换成对应的url
      if (shouldReplacePathParams) {
        requestOpts.url = options.host + replacePathParams(path, ctx.params);
      }

      // 检测post和put方法
      if ((requestOpts.method == 'POST' || requestOpts.method == 'PUT')) {
        if (!ctx.request.body) {
          console.warn('sending PUT or POST but no request body found');
        } else {
          requestOpts.body = getParsedBody(ctx);
        }

        if (ctx.request.type == 'application/json') {
          requestOpts.json = true;
        }
      }

      const response = await fetch(requestOpts.url, requestOpts);
      ctx.status = response.status;
      if (response.status == 200) {
        ctx.body = await response.json()
      }
    }
  }
}

function getParsedBody(ctx) {
  var body = ctx.request.body;
  if (body === undefined || body === null){
    return undefined;
  }
  var contentType = ctx.request.header['content-type'];
  if (!Buffer.isBuffer(body) && typeof body !== 'string') {
    if (contentType && ~contentType.indexOf('json')) {
      body = JSON.stringify(body);
    } else {
      body = body + '';
    }
  }
  return body;
}
