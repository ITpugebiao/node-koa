const Router = require('koa-router')

const authRouter = new Router()

const { login ,success } = require('../controller/auth.controller')
const { verifyLogin,verifyAuth } = require('../middleware/auth.middleware')





authRouter.post('/login', verifyLogin, login)   // 登录, 授权
authRouter.get('/test', verifyAuth ,success )    // 获取用户信息




module.exports = authRouter