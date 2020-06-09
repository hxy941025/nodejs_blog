const {getList, getDetails, newBlog, updateBlog, delBlog} = require('../contronller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModule')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SuccessModel(listData)
    }

    if (method === 'GET' && req.path === '/api/blog/details') {
        const data = getDetails(id)
        return new SuccessModel(data)
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel(data)
    }


    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if(result){
            return new SuccessModel()
        }else {
            return new ErrorModel('更新博客失败')
        }
    }


    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if(result){
            return new SuccessModel()
        }else {
            return new ErrorModel('删除博客失败')
        }
    }

}

module.exports = handleBlogRouter;
