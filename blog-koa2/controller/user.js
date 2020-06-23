const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
    //防止sql注入
    username = escape(username)
    //加密密码
    password = escape(genPassword(password))
    //先使用假数据
    const sql = `
        select username, realname from users where username=${username} and password=${password};
    `

    const rows = await exec(sql)
    return rows[0] || {}
}


module.exports = {
    login
}