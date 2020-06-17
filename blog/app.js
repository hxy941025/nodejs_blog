const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const {access} = require('./src/utils/log')
const handleBlogRouter = require('./src/routes/blog')
const handleUserRouter = require('./src/routes/user')

//session
// const SESSION_DATA = {}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 3600 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

//处理post data
const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })

    return promise
}


const serverHandle = (req, res) => {

    access(`
        ${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()} 
    `)

    // 设置数据返回格式为JSON
    res.setHeader('Content-type', 'application/json')

    // 获取PATH
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // //解析 session
    // let needSetCookie = false
    // let userId = req.cookie.userid
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    //     req.session = SESSION_DATA[userId]
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    //
    // req.session = SESSION_DATA[userId]

    // 解析session 使用redis
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }

    //获取session
    req.sessionId = userId
    get(userId).then(sessionData => {
        if (sessionData == null){
            // 初始化redis中的session值
            set(req.sessionId, {})
            // 设置session
            req.session = {}
        } else {
            // 设置session
            req.session = sessionData
        }

        //处理Post data
        return getPostData(req)
    }).then(postData => {
        req.body = postData

        //处理blog路由
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    // 操作cookie
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }


        //处理user路由
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    // 操作cookie
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(userData)
                )
            })
            return;
        }


        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()

    })

}


module.exports = serverHandle