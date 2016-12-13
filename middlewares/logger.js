export default async (ctx, next) => {
  var start = new Date;
  await next();
  var ms = new Date - start;
  console.log(`[${new Date().toLocaleTimeString()}] - ${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms`);
}