const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandler  = require('./error-handle');

// const userRouter = require('../router/user.router')
// const authRouter = require('../router/auth.router')

const useRoutes = require('../router/index')



const app = new Koa();

app.use(bodyParser());


useRoutes(app)
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());


// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())

app.on('error',errorHandler)

module.exports = app