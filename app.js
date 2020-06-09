const querystring = require('querystring')
const handleBlogRouter = require('./src/routes/blog')
const handleUserRouter = require('./src/routes/users')


const serverHandle = (req, res) => {

    // 设置数据返回格式为JSON
    res.setHeader('Content-type', 'application/json')

    // 获取PATH
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    const blogData = handleBlogRouter(req, res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    const userData = handleUserRouter(req, res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return
    }

    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()

}


module.exports = serverHandle