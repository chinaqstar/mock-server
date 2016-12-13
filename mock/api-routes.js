import Route from 'koa-router'
import YAML from 'yamljs'
import path from 'path'

const router = Route()
const CONFIG_PATH = path.join(__dirname, './config.yml')

/**
 * 获取用户信息
 */
router.get('/appmk/api/userInfo', async (ctx, next) => {
  try {
    const cfg = YAML.load(CONFIG_PATH)
    ctx.body = cfg.userInfo
    ctx.status = 200
    return next()
  } catch(e) {
    throw new Error(e)
  }
})

/**
 * 获取微信关注的二维图片地址
 */
router.get('/appmk/api/weixinAppInfo',  async (ctx, next) => {
  try {
    const cfg = YAML.load(CONFIG_PATH)
    ctx.body = cfg.wxQRcode
    ctx.status = 200
    return next()
  } catch(e) {
    throw new Error(e)
  }
})

/**
 * 获取抽奖信息
 * 
 * 未登录    MARKET_API_WX_PAY_INFO_002 | MARKET_WEIXIN_APP_008  
 * 关注公众号    MARKET_WEIXIN_APP_009
 * 抽奖3次  MARKET_WEIXIN_APP_011
 * 已中奖   MARKET_WEIXIN_APP_012 
 */
router.post('/h5_turn_price/api/d277fdd7a0c111e68d64b82a72ced42d/20/lucky_draw',  async (ctx, next) => {
  try {
    // console.log(ctx.request.body)
    const cfg = YAML.load(CONFIG_PATH)
    ctx.body = cfg.luckDraw
    ctx.status = 200
    return next()
  } catch(e) {
    throw new Error(e)
  }
})

export default router