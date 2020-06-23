const http = require('http')

// 组合中间件
function compose(middlewareList) {
    return function (ctx) {
        // 暂存中间件列表
        // 由于koa不像express是每次匹配路由得到中间件列表然后shift，直接shift middlewareList会将中间件列表清空
        const resultList = [...middlewareList]
        const next = () => {
            const middleware = resultList.shift()
            try {
                return Promise.resolve(
                    middleware(ctx, next)
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }
        next()
    }
}


class LikeMiddleware {
    constructor() {
        this.middlewareList = []
    }

    use(fn) {
        this.middlewareList.push(fn)
        return this
    }

    createCtx = (req, res) => {
        const ctx = {req, res}

        ctx.query = req.query
        return ctx
    }

    callback() {
        const next = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.createCtx(req, res)
            return next(ctx)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = LikeMiddleware