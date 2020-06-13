const {exec} = require('../db/mysql')

const getList = (author, keyword) => {
    //由于author和keyword值不确定，增加一个where占位预防报错
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author ='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`
    //返回promise对象
    return exec(sql)

}


const getDetails = (id) => {
    //先返回假数据（格式正确）
    const sql = `select * from blogs where id = '${id}';`

    return exec(sql).then(rows => {
        return rows[0]
    })
}


const newBlog = (blogData = {}) => {
    //blogData是一个博客对象，包含titile content属性
    const {title, content, author} = blogData
    const createTime = Date.now()

    const sql = `insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createTime}', '${author}');
    `

    return exec(sql).then(insertData => {

        return {
            id: insertData.insertId
        }
    })

}

const updateBlog = (id, blogData = {}) => {
    //id 要更新博客的id
    //blogData 是一个博客对象，包含title content属性

    const {title, content} = blogData

    const sql = `update blogs set title ='${title}', content = '${content}' where id = ${id};`

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0){
            return true
        }
        return false
    })

}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id ='${id}' and author = '${author}';`

    return exec(sql).then(delData => {
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
}


module.exports = {
    getList,
    getDetails,
    newBlog,
    updateBlog,
    delBlog
}