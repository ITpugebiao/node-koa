const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');
const verify = require('../utils/password-verify')

const verifyUser = async (ctx,next) => {
    //1. 获取用户名和密码
    const {name , password} = ctx.request.body;
    console.log(name,password);

    // 2.判断用户名或者密码不能空
    if(!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error',error,ctx);
    }

    // 3. 判断用户密码格式是否正确
    if(!verify(password)){
        console.log(123);
        const error = new Error(errorType.PASSWORD_FORMAT_ERROR);
        return ctx.app.emit('error',error,ctx);
    }
    console.log('ctx',123);
    //4. 判断这次注册的用户名是没有被注册过
     const result = await service.getUserByName(name);
       if(result.length){
           const error = new Error(errorType.USER_ALERADY_EXISTS);
           return ctx.app.emit('error',error,ctx)
       }

       console.log('ctx',123);
    await next()
}

const handlePassword =  async (ctx,next) => {
    
    let {password} = ctx.request.body;
    console.log('password',password);
    ctx.request.body.password = md5password(password)
    
    console.log('ctx',123);
    await next()
}
module.exports = {
    verifyUser,
    handlePassword
}