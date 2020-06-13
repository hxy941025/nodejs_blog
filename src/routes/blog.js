const {getList, getDetails, newBlog, updateBlog, delBlog} = require('../contronller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModule')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    if (method === 'GET' && req.path === '/api/blog/details') {
        const result = getDetails(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'zhangsan' //假数据，等待替换
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }


    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(
            value => {
                if (value) {
                    return new SuccessModel()
                } else {
                    return new ErrorModel('更新博客失败')
                }
            }
        )
    }


    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'zhangsan' //假数据，等待替换
        const result = delBlog(id, author)
        return result.then(
            value => {
                if (value) {
                    return new SuccessModel()
                } else {
                    return new ErrorModel('删除博客失败')
                }
            }
        )
    }
}

module.exports = handleBlogRouter;
