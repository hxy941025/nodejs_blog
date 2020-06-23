const xss = require('xss')
const {exec} = require('../db/mysql')

const  getList = async (author, keyword) => {
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
    return await exec(sql)

}


const getDetails = async (id) => {
    //先返回假数据（格式正确）
    const sql = `select * from blogs where id = '${id}';`
    const rows =  await exec(sql)
    return rows[0]
}


const newBlog = async (blogData = {}) => {
    //blogData是一个博客对象，包含titile content属性
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const {author} = blogData
    const createTime = Date.now()

    const sql = `insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createTime}', '${author}');
    `

    const insertData =  await exec(sql)
    return {
        id: insertData.insertId
    }

}

const updateBlog = async (id, blogData = {}) => {
    //id 要更新博客的id
    //blogData 是一个博客对象，包含title content属性

    const {title, content} = blogData
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    const updateData = await exec(sql)
    if (updateData.affectedRows > 0){
        return true
    }
    return false

}

const delBlog = async (id, author) => {
    const sql = `delete from blogs where id ='${id}' and author = '${author}';`

    const delData = await exec(sql)
    if (delData.affectedRows > 0){
        return true
    }
    return false

}


module.exports = {
    getList,
    getDetails,
    newBlog,
    updateBlog,
    delBlog
}