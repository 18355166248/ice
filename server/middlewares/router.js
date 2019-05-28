import Router from 'koa-router'
import config from './config'

export const router = app => {
  const router = new Router()

  router.get('/wechat-hear', (ctx, next) => {
    const token = config.wechat.token
    const { signature, nonce, timestamp, echostr } = ctx.query

  })
  // router.post('/wechat-hear', (ctx, next) => {})

  app.use(router.routes()).use(router.allowedMethods())
}
