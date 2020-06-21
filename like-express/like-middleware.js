const http = require('http')
const slice = Array.prototype.slice


class LikeMiddleware {
    constructor() {
        // 收集中间件
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }

    // 收集中间件函数
    register(path) {
        const info = {}
        // 若第一个参数为路由，则从第二个参数起当做中间件函数
        if (typeof path === 'string') {
            info.path = path
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }

        return info
    }

    //将对应的中间件存入对应方法中
    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }


    handle(req, res, resultList) {
        const next = () => {
            const middleware = resultList.shift()
            if (middleware){
                middleware(req, res, next)
            }
        }

        next()
    }

    match(method, url) {
        let stack = []
        if (url === '/favicon.ico') {
            return stack
        }

        //获取所有被请求方法匹配到的中间件
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])

        curRoutes.forEach(routeItem => {
            if (url.indexOf(routeItem.path) === 0) {
                stack = stack.concat(routeItem.stack)
            }
        })

        return stack
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }

            const method = req.method.toLowerCase()
            const url = req.url
            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }


    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }

}

module.exports = () => {
    return new LikeMiddleware()
}