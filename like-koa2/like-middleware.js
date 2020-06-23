const http = require('http')

// 组合中间件
function compose(middlewareList) {
    return function (ctx) {
        function dispatch(i) {
            console.log(i)
            const fn = middlewareList[i]
            try{
                return Promise.resolve(
                    // 对应async function (ctx, next),由于函数中存在await next，则会直接调用下一个函数
                    fn(ctx, dispatch.bind(null, i+1))
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}


class LikeMiddleware {
    constructor() {
        this.middlewareList = []
    }

    use(fn) {
        this.middlewareList.push(fn)
        // 链式调用 .use().use...
        return this
    }

    createContext(req, res) {
        const ctx = {req, res}

        // 只实现query
        ctx.query = req.query
        return ctx
    }

    handleRequest(ctx, fn){
        return fn(ctx)
    }

    callback() {
        const next = compose(this.middlewareList)

        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRequest(ctx, next)
        }
    }

    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = LikeMiddleware