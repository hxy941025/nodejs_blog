## 手写express中间件实现
#### 测试
```
node app.js
```

#### express中间件介绍
- 通过app.use/post/get/put等方法往其中注册的函数
- express中间件形式
```
app.use((req, res, next) => {
    console.log('中间件')
    next()
})
```
- app.use会被每个请求命中，如果带路由，则命中请求父路由相同的请求
- app.get会被get请求路由命中（默认get）
- app.post会被post请求路由命中
- next：结尾调用next，则继续命中下一个中间件，否则结束
    

#### 分析
- app.use等用来注册中间件，先收集起来
- 遇到http请求，根据path和method判断触发哪些
- 实现next机制，即上一个通过next触发下一个


#### 手写实现思路
- 中间件是个类，结尾module.exports为函数new一个实例，类似const app = express()
- 存在use、get、post等方法，利用一个公用方法来收集各请求方法对应的中间件，存入对应的列表中
- 存在listen方法，通过http.createServer，调用收集好所有中间件的callback函数，并且监听端口，打印信息等
- callback中实现最基础的res.json，获取请求的url、method，根据method从中间件列表中获取对应method中间件，根据路由匹配是否触发，将所触发到的中间件函数存入stack
- 实现核心方法next，将匹配到的所有中间件传入，shift推出stack逐个执行，直到所有中间件函数执行完毕，由于中间件中调用next，因此结合shift会自动遍历，若中间件中不调用next，则该中间件执行完毕后停止