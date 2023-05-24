const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

// 登录 - 中间件
const verifyLogin = async (ctx, next) => {
    // 1.获取用户和密码
    const { name, password } = ctx.request.body

    //2.判断用户名和密码是否为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 3. 判断用户是否存在 (用户不存在)
    const result = await userService.getUserByName(name)

    const user = result[0]

    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    // 4. 判断密码是否和数据库中的密码一致
    if (md5password(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRECT)
        return ctx.app.emit('error', error, ctx)
    }
     
    console.log(user);
    ctx.user = user;
    await next()
}

// 获取用户信息
const verifyAuth = async (ctx, next) => {

    // 1.获取token
    const authorization = ctx.headers.authorization;
    // console.log(authorization);
    if (!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx);
    }

    const token = authorization.replace('Bearer ', '');   // 将传过来的token前的 Bearer 去除
     
    console.log(token);

    // 2.验证token(id/name/iat/exp)
    try {
        // HS256  对称加密 
        // PUBLIC_KEY的问题
        const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
        ctx.user = result;
        await next();
      } catch (err) {
        console.log(123);
        const error = new Error(errorTypes.UNAUTHORIZATION);
        ctx.app.emit('error', error, ctx);
      }
}


const verifyPermission = async (ctx, next) => {
    console.log('123=>>>>>>',123);
    const [resourceKey] = Object.keys(ctx.params);   
    const tableName = resourceKey.replace('Id', '');  // 表名
    const resourceId = ctx.params[resourceKey];  // 评论id
    const { id } = ctx.user;   // 用户id
  
     console.log('tableName',tableName);
     console.log('resourceId',resourceId);
     console.log('id',id);
    // 2.查询是否具备权限
    try {
        console.log(1234);
      const isPermission = await authService.checkResource(tableName, resourceId, id);
      console.log(12345);
      if (!isPermission) throw new Error();
      await next();
    } catch (err) {
      const error = new Error(errorTypes.UNPERMISSION);
      return ctx.app.emit('error', error, ctx);
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}