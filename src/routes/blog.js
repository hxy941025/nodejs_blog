const { getList } = require('../contronller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModule')

const handleBlogRouter = (req, res) => {
    const method = req.method


    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SuccessModel(listData)
    }

    if(method === 'GET' && req.path === '/api/blog/details'){
        return {
            msg: '获取博客内容'
        }
    }

    if(method === 'POST' && req.path === '/api/blog/new'){
        return {
            msg: '新增一篇博客'
        }
    }


    if(method === 'POST' && req.path === '/api/blog/update'){
        return {
            msg: '更新一篇博客'
        }
    }


    if(method === 'POST' && req.path === '/api/blog/del'){
        return {
            msg: '删除一篇博客'
        }
    }

}

module.exports = handleBlogRouter;
