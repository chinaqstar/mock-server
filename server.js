'use strict'

import Koa from 'koa'
import Route from 'koa-router'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import logger from './middlewares/logger'
import error from './middlewares/error'
import pixie from './middlewares/pipe-proxy'
import apiRouter from './mock/api-routes'

// app开始
const app = new Koa()

// 开启代理
const proxy = pixie({host: 'http://localhost:8989'})

// 路由处理
const router = Route()
router.use(apiRouter.routes())

// 中间件
app
  .use(error)
  .use(logger)
  .use(bodyParser())
  .use(serve(path.join(__dirname, './dist')))
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())

//  开启8989端口
app.listen(8989, '0.0.0.0', () => {
  console.log('start listen on port 8989')
})
