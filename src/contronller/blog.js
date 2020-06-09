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
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '2020年6月9日15:18:05',
            author: 'lisi'
        }

    ]
}

module.exports = {
    getList
}