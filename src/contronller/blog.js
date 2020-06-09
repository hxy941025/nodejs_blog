const getList = (author, keyword) => {
    //先返回假数据（格式正确）
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '2020年6月9日15:17:31',
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题A',
            content: '内容A',
            createTime: '2020年6月9日15:18:05',
            author: 'lisi'
        }

    ]
}

const getDetails = (id) => {
    //先返回假数据（格式正确）
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '2020年6月9日15:17:31',
            author: 'zhangsan'
        },
    ]
}


const newBlog = (blogData = {}) => {
    //blogData是一个博客对象，包含titile content属性

    return {
        id: 3   //表示新建博客插入到数据表的id
    }

}

const updateBlog = (id, blogData = {}) => {
    //id 要更新博客的id
    //blogData 是一个博客对象，包含title content属性

    console.log('update blog', id, blogData);

    return true
}

const delBlog = (id) => {
    return true
}


module.exports = {
    getList,
    getDetails,
    newBlog,
    updateBlog,
    delBlog
}