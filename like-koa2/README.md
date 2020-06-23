## 手写koa2中间件实现
#### 测试
```
node app.js
```

#### koa2中间件介绍
- 通过app.use往其中注册的函数
- koa2中间件形式
```
app.use(async (ctx, next) => {
    console.log('下一个中间件开始')
    await next()
    console.log('下一个中间件结束')
})
```
- 相比express中间件，由于koa不带路由，因此只有app.use，无get post等
- 使用ctx代替req和res
- 中间件看似为列表排列，实际为层层包裹，即上一个组件执行到await next则进入下一个组件，直到最后一个即最内部执行完毕，再层层返回执行上一个组件未执行完毕的内容，像洋葱圈一样



#### 手写实现思路
- 由于koa不涉及路由，相比express中间件实现，只需要收集use注册的中间件队列，module.exports为class本身（koa2引用方式为new Koa）
- listen方法同express中间件，利用http.createServer，传入callback创建server
- callback函数中首先要获取中间件组合后的函数并返回，组合函数内部实现next机制，均需返回Promise，具体实现方式类似express，稍作修改即可
- 由于koa2中使用ctx代替req和res，因此需要在执行中间件函数前，将req和res代理到ctx上，此处只实现简单对象合并及query功能