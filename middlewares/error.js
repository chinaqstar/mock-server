export default async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('==================')
    console.log(err)
    console.log('==================')
    ctx.status = 200
    ctx.body = err.toString()
  }
}