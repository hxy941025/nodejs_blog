### 基于nodejs搭建博客系统
- http-test: 原生js实现登录、博客管理等
- blog: 原生nodejs实现，用户登录、验证，新增、查询、编辑博客等功能
- blog-express: 基于express实现上述功能
- blog-koa2: 基于koa2实现上述功能
- like-express: 手写实现简化版express中间件
- like-koa2: 手写实现简化版koa2中间件

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

# start http
cd html-test
http-server -p 8001

# nginx.conf 
注释location \
增加 
//代理/到8001端口
location / {
proxy_pass http://localhost:8001;
}
//代理所以/api/到8000端口
location /api/ {
proxy_pass http://localhost:8000;
proxy_set_header Host $host;
}

# develop
npm run dev
```

#### 项目目录
http-test：
```
├── admin.html //管理
├── detail.html //博客详情
├── edit.html //博客编辑
├── index.html //首页/全体博客列表
├── login.html //博客登录
└── new.html //新建博客
```

blog:
```
src
├── config //数据库连接配置
│   └── db.js
├── controller //各接口对应的具体sql操作
│   ├── blog.js
│   └── user.js
├── db //封装操作sql及redis的方法
│   ├── mysql.js
│   └── redis.js
├── model //res的数据模型，统一返回格式
│   └── resModule.js
├── routes //路由表
│   ├── blog.js
│   └── user.js
└── utils //密码加密、访问日志等小功能
    ├── copy.sh
    ├── cryp.js
    ├── log.js
    └── readline.js
```

blog-express: 
```
├── app.js
├── bin
│   └── www
├── config
│   └── db.js
├── controller
│   ├── blog.js
│   └── user.js
├── db
│   ├── mysql.js
│   └── redis.js
├── logs
│   └── access.log
├── middleware //单独拆出来的中间件函数
│   └── loginCheck.js
├── model
│   └── resModule.js
├── package.json
├── routes
│   ├── blog.js
│   └── user.js
└── utils
    └── cryp.js

```
blog-koa2:
```
├── app.js
├── bin
│   └── www
├── config
│   └── db.js
├── controller
│   ├── blog.js
│   └── user.js
├── db
│   ├── mysql.js
│   └── redis.js
├── logs
│   └── access.log
├── middleware
│   └── loginCheck.js
├── model
│   └── resModule.js
├── package.json
├── routes
│   ├── blog.js
│   └── user.js
└── utils
    └── cryp.js
```
