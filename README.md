### 基于nodejs搭建博客系统
原生nodejs实现，用户登录、验证，新增、查询、编辑博客等功能
用于nodejs入门

#### 完成功能
- API：处理http接口
- 数据存储：sql存数据，redis存用户信息
- 登录：cookie+session+登录校验
- 日志：访问日志
- 安全：sql注入（登录部分）、xss攻击（创建博客）、密码加密

#### 技术
- http、stream、session、mysql、redis、nginx、pm2

#### 项目启动
```
# install dependency
npm install

# start redis
redis-server

# develop
npm run dev
```

#### 项目目录
```
src
├── config
│   └── db.js
├── controller
│   ├── blog.js
│   └── user.js
├── db
│   ├── mysql.js
│   └── redis.js
├── model
│   └── resModule.js
├── routes
│   ├── blog.js
│   └── user.js
└── utils
    ├── copy.sh
    ├── cryp.js
    ├── log.js
    └── readline.js
```