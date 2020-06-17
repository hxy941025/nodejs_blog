### 基于nodejs搭建博客系统
完成功能
- API
- 数据存储
- 登录
- 日志
- 安全

技术
- http、stream、session、mysql、redis、nginx、pm2


项目启动
```
# install dependency
npm install

# start redis
redis-server

# develop
npm run dev
```

项目目录
└── src
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
        ├── log.js
        └── readline.js