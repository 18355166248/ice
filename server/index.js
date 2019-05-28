import { resolve } from 'path'
import R from 'ramda'
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const MIDDLEWARES = ['router']

const r = path => resolve(__dirname, path)

class Server {
  constructor() {
    this.app = new Koa()
    this.useMiddleWare(this.app)(MIDDLEWARES)
    config.dev = !(app.env === 'production')
  }

  useMiddleWare(app) {
    return R.map(
      R.compose(
        R.map(i => i(app)),
        require,
        i => `r('./middlewares')/${i}`
      )
    )
  }

  async start() {
    const nuxt = new Nuxt(config)

    const {
      host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
    } = nuxt.options.server

    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }

    this.app.use(ctx => {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    })

    this.app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  }
}

const app = new Server()
app.start()
