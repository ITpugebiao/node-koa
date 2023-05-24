const jwt = require('jsonwebtoken');  // 制作token
const { PRIVATE_KEY } = require('../app/config');  



class AuthController {
    async login(ctx,next){
        const { id, name } = ctx.user;
        console.log(ctx);
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
          });
      
          ctx.body = {code:20000, id, name, token }
    }

    async success(ctx, next) {
        ctx.body = "授权成功~";
    } 
}

module.exports = new AuthController()